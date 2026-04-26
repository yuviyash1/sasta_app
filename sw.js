importScripts('https://www.gstatic.com/firebasejs/12.12.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.12.1/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyDZR-o19et3CGouP0-4XScIc7ZcocV05SA",
    authDomain: "pwa-f72eb.firebaseapp.com",
    projectId: "pwa-f72eb",
    storageBucket: "pwa-f72eb.firebasestorage.app",
    messagingSenderId: "435190849777",
    appId: "1:435190849777:web:48026cc2aca5bb8d2dc950",
    measurementId: "G-BF6X6ZBD29"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Background message handler
messaging.onBackgroundMessage((payload) => {
  console.log('[sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'icons/icon-192x192.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Cache logic
const CACHE_NAME = 'love-app-v6';
const urlsToCache = [
  'index.html',
  'manifest.json',
  'x.jpeg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
      );
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

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});