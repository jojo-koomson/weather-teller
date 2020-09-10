const cacheName ='static-cache-v.2';
const dymCache = 'static-dym-v.1';
const assets = [
    '/',
    '/index.html',
    '/app.js', 
    '/weather-pic.jpg',
    '/style.css',
    '/icons',
    '/link-sw.js',
    '/manifest.json'

];

// limits caches function 

const cacheLimit = (name, capacity) =>{
    caches.open(name).then(cache => {
        cache.keys().then(keys =>{
            if (keys.length > capacity){
                cache.delete(keys[0]).then(cacheLimit(name, capacity));
            }
        })
    })
}

// service worker install event
self.addEventListener('install', evt => {
//  console.log('service worker has been installed');
evt.waitUntil(
    caches.open(cacheName).then(cache =>{
    console.log('caching shell assets');
    cache.addAll(assets) 
}))

});

// service worker active event
self.addEventListener('activate', evt => {
    // console.log('service worker has been activated');
    evt.waitUntil(
        caches.keys().then(keys =>{
            console.log(keys);
            return Promise.all(keys
                .filter(key => key !== cacheName && key !== dymCache)
                .map( key => caches.delete(key))
                )
                
            
        })
    )
   });

self.addEventListener('fetch', evt => {
    // console.log('fetched event', evt);
    evt.respondWith(
        caches.match(evt.request).then((cacheResp)=>{
            return cacheResp || fetch(evt.request).then(fetchResp => {
                return caches.open(dymCache).then(cache => {
                    cache.put(evt.request.url, fetchResp.clone());
                    cacheLimit(dymCache, 5);
                    return fetchResp;
                })
            });
        })
    );
   });