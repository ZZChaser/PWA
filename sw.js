
const cacheName = 'my-pwa-v3';

const cacheList = [
  '/PWA/',
  '/PWA/index.html',
  '/PWA/src/assets/js/index.js',
  '/PWA/src/assets/icons/app_icon.svg',
];

self.addEventListener('install', (event) => {
  console.log('install:', event)
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('cache all cacheList');
      return cache.addAll(cacheList)
    })
  );
});

self.addEventListener('fetch', (event) => {
  console.log('fetch---', event)
  event.respondWith(
    caches.match(event.request).then((response) => {
      console.log('match', {response})
      if (response) {
        return response;
      }
      return fetch(event.request).then((response) => {
        console.log('fetch', {response})
        if (!response || response.status !== 200) {
          return response;
        }
        return caches.open(cacheName)
          .then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          });
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
//           cacheNames.filter((cacheName) => cacheName !== cacheName).map((cacheName) => caches.delete(cacheName))
//         );
//       })
//       .then(() => {
//         return self.clients.claim();
//       })
//   );
// });
