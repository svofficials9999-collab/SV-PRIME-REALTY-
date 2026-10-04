// SV PRIME REALTY service worker. Pages are always network-first so users never get stuck on an old version.
const ROOT=new URL('./',self.location.href).href;
const SHELL_CACHE='svp-shell-v2-back';
const IMG_CACHE='svp-img-v1';
const SHELL=[ROOT,new URL('index.html',ROOT).href,new URL('manifest.webmanifest',ROOT).href];
self.addEventListener('install',e=>{e.waitUntil(caches.open(SHELL_CACHE).then(c=>Promise.all(SHELL.map(u=>fetch(u,{cache:'no-store'}).then(r=>r.ok?c.put(u,r):0).catch(()=>0)))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('svp-')&&k!==SHELL_CACHE&&k!==IMG_CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
async function trim(c,max){const ks=await c.keys();for(let i=0;i<ks.length-max;i++)await c.delete(ks[i])}
self.addEventListener('fetch',e=>{
 const r=e.request,u=new URL(r.url);
 if(r.method!=='GET')return;
 if(r.headers.has('range'))return;
 // Page navigations: network first, cached copy only when offline.
 if(r.mode==='navigate'&&u.origin===self.location.origin&&u.href.startsWith(ROOT)){
  e.respondWith((async()=>{try{const n=await fetch(r,{cache:'no-store'});if(n.ok){const c=await caches.open(SHELL_CACHE);c.put(new URL('index.html',ROOT).href,n.clone())}return n}catch(_){const c=await caches.open(SHELL_CACHE);return (await c.match(new URL('index.html',ROOT).href))||(await c.match(ROOT))||Response.error()}})());return}
 // Same-site files that are not pages: network first, cached copy only when offline.
 if(u.origin===self.location.origin&&u.href.startsWith(ROOT)&&!/\.(mp4|webm|mov|pdf)$/i.test(u.pathname)&&!u.searchParams.has('_v')){
  e.respondWith((async()=>{try{const n=await fetch(r,{cache:'no-store'});if(n.ok&&r.destination==='image'){const c=await caches.open(IMG_CACHE);c.put(r,n.clone());trim(c,150)}else if(n.ok&&SHELL.includes(u.href)){const c=await caches.open(SHELL_CACHE);c.put(r,n.clone())}return n}catch(_){return (await caches.match(r))||Response.error()}})());return}
 // Images from Google (listing photos): show cached copy first, refresh in background.
 if(r.destination==='image'&&/googleusercontent\.com$/.test(u.hostname)){
  e.respondWith((async()=>{const c=await caches.open(IMG_CACHE);const hit=await c.match(u.href);const net=fetch(u.href,{mode:'cors'}).then(n=>{if(n.ok){c.put(u.href,n.clone());trim(c,150)}return n}).catch(()=>null);if(hit){net.catch(()=>0);return hit}const n=await net;return n||fetch(r).catch(()=>Response.error())})());return}
});
