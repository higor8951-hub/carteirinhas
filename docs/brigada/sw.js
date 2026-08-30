const C='brigada-adm-offline-v9-mapa-nitido';
const A=[
  './','./index.html','./manifest.webmanifest','./icon.svg',
  './areas1.js','./areas2.js','./areas3.js','./areas4.js','./scenarios.js','./quick.js',
  // mapa de contingência
  './map1.txt','./map2.txt','./map3.txt','./map4.txt',
  // mapa técnico de alta nitidez
  './clear01.txt','./clear02.txt','./clear03.txt','./clear04.txt','./clear05.txt',
  './clear06.txt','./clear07.txt','./clear08.txt','./clear09.txt','./clear10.txt','./clear11.txt',
  './clear12a.txt','./clear12b.txt','./clear13.txt','./clear14.txt','./clear15.txt',
  './clear16.txt','./clear17.txt','./clear18.txt','./clear19.txt','./clear20.txt'
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
