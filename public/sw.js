const CACHE_NAME = 'color-clash-cache-v2'; // Updated cache name to force a new installation
const urlsToCache = [
    '/',
    '/index.html',
    '/game.js',
    '/public/assets/images/favicon.ico',
    '/public/assets/images/icon-192.png',
    '/public/assets/images/icon-512.png',
    '/public/assets/sound/click.mp3',  // Replace with actual audio file names
    '/public/assets/sound/gameover.mp3' // Replace with actual audio file names
];

// Install the service worker and cache assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            // Use Promise.all to fetch each resource individually and log failures
            return Promise.all(
                urlsToCache.map(url => {
                    return cache.add(url).catch(error => {
                        console.error(`Failed to cache ${url}:`, error);
                    });
                })
            ).then(() => {
                console.log('All resources cached successfully');
            });
        })
    );
});

// Serve cached assets when offline
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

// Update the cache when the service worker is activated
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});