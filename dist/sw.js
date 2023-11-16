// Establish a cache name
const cacheName = 'TOI_v2';

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(cacheName).then((cache) => {
    // Precache needed files
    return cache.addAll([
      '/assets/index.css',
      '/assets/index.js',
      'favicon.svg',
      '/',
    ]);
  }));
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(
            keyList => Promise.all(keyList.map((key) => {
                if (key !== cacheName) {
                    return caches.delete(key);
                }
            }))
        )
    );
});

self.addEventListener('fetch', (event) => {
  // Open the cache
  event.respondWith(caches.open(cacheName).then((cache) => {
    // Go to the network first
    return fetch(event.request.url).then((fetchedResponse) => {
      cache.put(event.request, fetchedResponse.clone());

      return fetchedResponse;
    }).catch(() => {
      // If the network is unavailable, get from cache
      return cache.match(event.request.url);
    });
  }));
});