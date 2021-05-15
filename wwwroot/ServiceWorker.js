/*  */

const CacheName = "CoreNodeCahce";
const Assets = [
  "/",
  "/manifest.json",
];

self.addEventListener("install", InstallEvent => {
  InstallEvent.waitUntil(
    caches.open(CacheName).then(cache => {
      cache.addAll(Assets);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(CacheName).then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          if(event.request.destination != 'document' && event.request.url.indexOf('http') === 0){
            //console.log("Adding file to cache : " + event.request.destination);
            //cache.put(event.request, response.clone());
          }
          return response;
        });
      });
    })
  );
});