
const cacheStorageKey = 'my-pwa-1';

const cacheList = [
  '../../../',
  '../../../index.html',
  '../../../src/assets/js/index.js',
  '../../../src/assets/icons/app_icon.svg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheStorageKey).then((cache) => cache.addAll(cacheList))
    // .then(() => self.skipWaiting())
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      const requestClone = event.request.clone();
      return fetch(requestClone).then((response) => {
        if (!response || response.status !== 200) {
          return response;
        }
        const responseClone = response.clone();
        caches.open(cacheStorageKey).then((cache) => cache.put(requestClone, responseClone));
        return response;
      });
    })
  );
});
// self.addEventListener('activate', (event) => {
//   event.waitUntil(
//     caches
//       .keys()
//       .then((cacheNames) => {
//         return Promise.all(
//           cacheNames.filter((cacheName) => cacheName !== cacheStorageKey).map((cacheName) => caches.delete(cacheName))
//         );
//       })
//       .then(() => {
//         return self.clients.claim();
//       })
//   );
// });
