const pwaCache = 'pwa-cache-2';
self.addEventListener('install',e =>{
    let cacheReady = caches.open(pwaCache).then(cache => {
        console.log('new cache ready');
    /* 
    add to cache one url
    */ 
        // return cache.add('/');
        
    /* 
    add to cache more than one url
    */
        // if any of request failed then whole promise failed
        return cache.addAll([
            '/',
            'style.css',
            'main.js'
        ]);
        
    });

    e.waitUntil(cacheReady);
});

/* 
to clean up old cache
*/

self.addEventListener('activate', (e)=>{
   let cacheClean = caches.keys().then(keys => {
        keys.forEach(key => {
            if(key!==pwaCache){
               return caches.delete(key);
            }
        })
    });
    e.waitUntil(cacheClean);
})

/* 
    to server from cache file
*/

// self.addEventListener('fetch', (e)=>{
//     if(e.request.url === 'http://localhost:8080/'){
//         // open currently used cache
//         let newRes = caches.open(pwaCache).then(cache => {
//             // match cache entry directly to url
//             return cache.match(e.request);
//         });
//         e.respondWith(newRes);
//     }

// })

self.addEventListener('fetch', (e)=>{
    /*  
    skip for remote fetch ie different origin
    */
    if(!e.request.url.match(location.origin))
        return ;

    /* 
    serve local fetch from cache
    */
        // open currently used cache
        let newRes = caches.open(pwaCache).then(cache => {
            // match cache entry directly to url
            return cache.match(e.request).then(res => {
                // check if response alresdy exist
                if(res){
                    console.log(`serving ${res.url} from cache`);
                    return res;
                }

                // if res not found, fetch on behalf of client and cache
                return fetch(e.request).then((fetchRes) => {
                    // cache.add result in another cache reuqest being added
                    cache.put(e.request, fetchRes.clone());
                    return fetchRes;
                })
            });
        });
        e.respondWith(newRes);
    

})