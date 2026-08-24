const CACHE="with-fam-v0.3.4";
self.addEventListener("install",event=>{
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll([
    "./","./index.html","./style.css","./app.js","./manifest.webmanifest","./sky-bg.png"
  ])));
});
self.addEventListener("activate",event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)));
    await self.clients.claim();
  })());
});
self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET") return;
  event.respondWith((async()=>{
    try{
      const fresh=await fetch(event.request,{cache:"no-store"});
      if(fresh && fresh.ok){
        const cache=await caches.open(CACHE);
        cache.put(event.request,fresh.clone());
      }
      return fresh;
    }catch(err){
      const cached=await caches.match(event.request);
      if(cached) return cached;
      throw err;
    }
  })());
});
