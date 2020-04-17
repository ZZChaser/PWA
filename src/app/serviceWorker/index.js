importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js");

const cacheStorageKey = "my-pwa";

const cacheList = [
  '../../../',
  '../../../index.html',
  '../../..//assets/js/index.js',
  '../../..//assets/icons/app_icon.svg',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheStorageKey)
      .then(cache => cache.addAll(cacheList))
      .then(() => self.skipWaiting())
  )
})