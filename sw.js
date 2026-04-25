const CACHE_NAME = 'test-pwa-cache-v2';
// Remove the leading slashes so they are relative to the folder
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './https://yashwant-singh.com.np/logoo/icon-192.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});