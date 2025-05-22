const CACHE_NAME = 'color-clash-cache-v2';
const urlsToCache = [
    '/color-clash/',
    '/color-clash/index.html',
    '/color-clash/game.js',
    '/color-clash/public/assets/images/favicon.ico',
    '/color-clash/public/assets/images/icon-192.png',
    '/color-clash/public/assets/images/icon-512.png',
    '/color-clash/public/assets/sound/click.mp3',
    '/color-clash/public/assets/sound/gameover.mp3'
];

// Install event (unchanged)
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
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

// Fetch event
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

// Activate event (unchanged)
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