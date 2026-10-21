// SV PRIME REALTY service worker. Pages are always network-first so users never get stuck on an old version.
const ROOT=new URL('./',self.location.href).href;
const SHELL_CACHE='svp-shell-v9-ri1';
const IMG_CACHE='svp-img-v1';
const SHELL=[ROOT,new URL('index.html',ROOT).href,new URL('manifest.webmanifest',ROOT).href];
self.addEventListener('install',e=>{e.waitUntil(caches.open(SHELL_CACHE).then(c=>Promise.all(SHELL.map(u=>fetch(u,{cache:'no-store'}).then(r=>r.ok?c.put(u,r):0).catch(()=>0)))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{const ks=await caches.keys();await Promise.all(ks.filter(k=>k.startsWith('svp-')&&k!==SHELL_CACHE&&k!==IMG_CACHE).map(k=>caches.delete(k)));await self.clients.claim();const cs=await self.clients.matchAll({type:'window',includeUncontrolled:true});await Promise.all(cs.filter(c=>/\/(poster-maker|promo-studio)\.html$/.test(new URL(c.url).pathname)).map(c=>c.navigate(c.url).catch(()=>0)))})())});
async function trim(c,max){const ks=await c.keys();for(let i=0;i<ks.length-max;i++)await c.delete(ks[i])}
self.addEventListener('fetch',e=>{
 const r=e.request,u=new URL(r.url);
 if(r.method!=='GET')return;
 if(r.headers.has('range'))return;
 // SV PRIME EDITS apps (poster-maker.html, promo-studio.html) are separate products:
 // never answer them from this worker; they use their own worker or the plain network.
 if(/\/(poster-maker|promo-studio)\.html$/.test(u.pathname))return;
 // Page navigations: network first, cached copy only when offline.
 if(r.mode==='navigate'&&u.origin===self.location.origin&&u.href.startsWith(ROOT)){
  boundedStartup(e,(async()=>{try{const n=await fetch(r,{cache:'no-store'});if(n.ok){const c=await caches.open(SHELL_CACHE);c.put(u.href,n.clone())}return n}catch(_){const c=await caches.open(SHELL_CACHE);return (await c.match(u.href))||(await c.match(new URL('index.html',ROOT).href))||(await c.match(ROOT))||Response.error()}})());return}
 // Same-site files that are not pages: network first, cached copy only when offline.
 if(u.origin===self.location.origin&&u.href.startsWith(ROOT)&&!/\.(mp4|webm|mov|pdf)$/i.test(u.pathname)&&!u.searchParams.has('_v')){
  boundedStartup(e,(async()=>{try{const n=await fetch(r,{cache:'no-store'});if(n.ok&&r.destination==='image'){const c=await caches.open(IMG_CACHE);c.put(r,n.clone());trim(c,150)}else if(n.ok&&SHELL.includes(u.href)){const c=await caches.open(SHELL_CACHE);c.put(r,n.clone())}return n}catch(_){return (await caches.match(r))||Response.error()}})());return}
 // Images from Google (listing photos): show cached copy first, refresh in background.
 if(r.destination==='image'&&/googleusercontent\.com$/.test(u.hostname)){
  boundedStartup(e,(async()=>{const c=await caches.open(IMG_CACHE);const hit=await c.match(u.href);const net=fetch(u.href,{mode:'cors'}).then(n=>{if(n.ok){c.put(u.href,n.clone());trim(c,150)}return n}).catch(()=>null);if(hit){net.catch(()=>0);return hit}const n=await net;return n||fetch(r).catch(()=>Response.error())})());return}
});

// Preserve fast network freshness; use this app's saved page after 1.2s if the connection stalls.
function boundedStartup(e,pending){
 if(e.request.mode!=='navigate'){e.respondWith(pending);return}
 e.waitUntil(Promise.resolve(pending).then(()=>{},()=>{}));
 e.respondWith((async()=>{const c=await caches.open(SHELL_CACHE),u=new URL(e.request.url),base=new URL('./',self.location.href);let hit=await c.match(e.request,{ignoreSearch:true});if(!hit&&(u.pathname===base.pathname||u.pathname===new URL('index.html',base).pathname))hit=await c.match(base.href)||await c.match(new URL('index.html',base).href);if(!hit)return pending;let timer;try{return await Promise.race([Promise.resolve(pending).catch(()=>hit),new Promise(r=>{timer=setTimeout(()=>r(hit),1200)})])}finally{clearTimeout(timer)}})());
}
