// SV PRIME REALTY service worker. Pages are always network-first so users never get stuck on an old version.
const ROOT=new URL('./',self.location.href).href;
const SHELL_CACHE='svp-public-shell-v3';
const IMG_CACHE='svp-public-img-v2';
const PUBLIC_FILES=['index.html','poster-maker.html','promo-studio.html','aduri-dream-valley.html','new-home.html','manifest.webmanifest','poster-manifest.webmanifest'];
const SHELL=[ROOT,...PUBLIC_FILES.map(p=>new URL(p,ROOT).href)];
function publicKey(url){let u;try{u=new URL(url)}catch(_){return null;}if(u.origin!==self.location.origin)return null;const path=u.pathname;const root=new URL(ROOT).pathname;if(path===root)return new URL('index.html',ROOT).href;const rel=path.startsWith(root)?path.slice(root.length):'';return PUBLIC_FILES.includes(rel)?new URL(rel,ROOT).href:null;}
self.addEventListener('install',e=>{e.waitUntil(caches.open(SHELL_CACHE).then(c=>Promise.all(SHELL.map(u=>fetch(u,{cache:'no-store'}).then(r=>r.ok?c.put(u,r):0).catch(()=>0)))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>['svp-shell-v2-back','svp-img-v1'].includes(k)).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
async function trim(c,max){const ks=await c.keys();for(let i=0;i<ks.length-max;i++)await c.delete(ks[i])}
self.addEventListener('fetch',e=>{
 const r=e.request,u=new URL(r.url);
 if(r.method!=='GET')return;
 if(r.headers.has('range'))return;
 // Page navigations: network first, cached copy only when offline.
 if(r.mode==='navigate'&&publicKey(u.href)){
  e.respondWith((async()=>{try{const n=await fetch(r,{cache:'no-store'});if(n.ok){const c=await caches.open(SHELL_CACHE);await c.put(publicKey(u.href),n.clone())}return n}catch(_){const c=await caches.open(SHELL_CACHE);return (await c.match(publicKey(u.href)))||Response.error()}})());return}
 // Only explicitly public shell files are cacheable. Unknown/future private paths use network only.
 const key=publicKey(u.href);
 if(key&&r.mode!=='navigate'){
  e.respondWith((async()=>{const c=await caches.open(SHELL_CACHE);try{const n=await fetch(r,{cache:'no-store'});if(n.ok)await c.put(key,n.clone());return n}catch(_){return (await c.match(key))||Response.error()}})());
 }
 // Preserve public listing-photo caching, never cache images requested by private/unknown pages.
 if(r.destination==='image'&&publicKey(r.referrer)&&(u.origin===self.location.origin||/googleusercontent\.com$/.test(u.hostname))){
  e.respondWith((async()=>{const c=await caches.open(IMG_CACHE);try{const n=await fetch(r);if(n.ok){await c.put(r,n.clone());await trim(c,150)}return n}catch(_){return (await c.match(r))||Response.error()}})());
 }

});
