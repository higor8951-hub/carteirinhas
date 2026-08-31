const C='brigada-adm-offline-v11-mapa-oficial';
const A=[
  './','./index.html','./manifest.webmanifest','./icon.svg',
  './areas1.js','./areas2.js','./areas3.js','./areas4.js','./scenarios.js','./quick.js',
  './map-data-01.js','./map-data-02.js','./map-data-03.js','./map-data-04.js','./map-data-05.js',
  './map-data-06.js','./map-data-07.js','./map-data-08.js','./map-data-09.js','./map-data-10.js',
  './map-data-11.js','./map-data-12.js','./map-data-13.js','./map-data-14.js','./map-data-15.js',
  './map-data-16.js','./map-data-17.js',
  './mapa-operacional.svg',
  './map1.txt','./map2.txt','./map3.txt','./map4.txt'
];
self.addEventListener('install',e=>e.waitUntil(
  caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting())
));
self.addEventListener('activate',e=>e.waitUntil(
  caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())
));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(res=>{
    if(res&&res.ok){const copy=res.clone();caches.open(C).then(c=>c.put(e.request,copy));}
    return res;
  }).catch(()=>e.request.mode==='navigate'?caches.match('./index.html'):new Response('offline',{status:503,statusText:'Offline'}))));
});