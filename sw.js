const CACHE_NAME = 'classes-app-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn.tailwindcss.com', // Cache do Tailwind
  'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap' // Fontes
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna do cache se encontrar, senão busca na rede
        return response || fetch(event.request);
      })
  );
});