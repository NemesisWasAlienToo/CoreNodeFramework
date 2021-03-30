/*  */

const CacheName = "CoreNodeCahce";
const Assets = [
  "/",
  "/manifest.json",
  "/favicon.ico",
  "/static/css/site.css",
  "/static/icons/144.png",
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
          //cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});