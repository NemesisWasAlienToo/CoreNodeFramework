/*  */

const CacheName = "CoreNodeCahce";
const Assets = [
  "/",
  "/manifest.json",
  "/favicon.ico",
  "/ServiceWorker.js",
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

self.addEventListener("fetch", FetchEvent => {
  FetchEvent.respondWith(
    caches.match(FetchEvent.request).then(res => {
      return res || fetch(FetchEvent.request);
    })
  );
});

