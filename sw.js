// Mudei a versão para v3 para forçar a atualização do cache
const CACHE_NAME = 'salinas-planner-v3'; 
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './calendario.jpg',
  './icone.svg', // <--- ADICIONEI O NOVO ÍCONE AQUI
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  // Força o novo service worker a ativar imediatamente
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Apaga os caches antigos (v1, v2...)
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Toma controle das abas abertas imediatamente
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});