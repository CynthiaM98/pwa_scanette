var cacheName = 'scanette_cache';
var appShellFiles = [
  '/webapp/',
  '/webapp/index.html',
  '/webapp/favicon.ico',
  '/webapp/manifest.json',
  '/webapp/produits.csv',
  '/webapp/style.css',
  '/webapp/images/barcode-scanner.png',
  '/webapp/images/icon-cart.png',
  '/webapp/images/icon-setup.png',
  '/webapp/images/icon-transmit.png',
  '/webapp/images/logo.png',
  '/webapp/icons/icon-32.png',
  '/webapp/icons/icon-64.png',
  '/webapp/icons/icon-96.png',
  '/webapp/icons/icon-128.png',
  '/webapp/icons/icon-168.png',
  '/webapp/icons/icon-192.png',
  '/webapp/icons/icon-256.png',
  '/webapp/icons/icon-512.png',
  '/webapp/icons/icon-180.png'
];

self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
          console.log('[Service Worker] Caching all: app shell and content');
      return cache.addAll(contentToCache);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => {
          console.log('[Service Worker] Fetching resource: '+e.request.url);
      return r || fetch(e.request).then((response) => {
                return caches.open(cacheName).then((cache) => {
          console.log('[Service Worker] Caching new resource: '+e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});