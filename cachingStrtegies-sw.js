const pwaCache = 'pwa-cache-2';
const staticCache = [
    '/pwa_lecture/',
    '/pwa_lecture/style.css',
    '/pwa_lecture/main.js',
    '/pwa_lecture/defaultStyle.css'
];

self.addEventListener('fetch', (e)=>{

    /* 
    5. cache and network race
    dispatch network request and cache request at same time then one which resolves first will win
    */

    let firstResponse = new Promise((resolve, reject) => {

        //track rejection - when none of(network or catche) able to resolve promise
        //if ts first rejection wait but if second reject then reject overall(firstResponse)

        let firstRejectionReceived = false;
        let rejectOnce = () => {
            console.log('firstRejectionReceived', firstRejectionReceived);
            if(firstRejectionReceived){
                // now second rejection

                // placeholder before fully rejection
                if(e.request.url.match('style.css')){
                    console.log('defaultStye');
                    resolve(caches.match('.defaultStyle.css'));
                }

                reject('no response received');
            }else{
                firstRejectionReceived = true;
            }
        }

        // try network
        fetch(e.request).then(res => {
            console.log('---', res.ok,e.request.url);
            res.ok ? resolve(res) : rejectOnce();
        }).catch(rejectOnce);

        // try cache
        caches.match(e.request).then(res => {
            // check cache found
            res ? resolve(res) : rejectOnce(); 
        }).catch(rejectOnce);

    });
    e.respondWith(firstResponse);



    /* 
    4. cache with network update
    we go to cache serve the user immediately then update cache in background so on next reload updated content will be served
    */

    // e.respondWith(
    //     caches.open(pwaCache).then(cache => {
    //         // return from cache
    //         return cache.match(e.request).then(res => {
                
    //             //update
    //             let updatedRes = fetch(e.request).then(newRes => {
    //                 // cache new response
    //                 cache.put(e.request, newRes.clone());
    //                 return newRes;
    //             }) ;
    //             console.log('res || updatedRes',res || updatedRes);
    //             return res || updatedRes;
    //         })
    //     })
    // );



    /* 
    3. network with cache fallback
    if possible got to network if not then go to cache
    */

    // e.respondWith(
    //     fetch(e.request).then(res => {
    //         // cache latest version
    //         caches.open(pwaCache).then(cache => cache.put(e.request, res));
    //         return res.clone();
    //     })
    //     .catch(err => caches.match(e.request))
    //     )

    /* 
    2.cache with network fallback
    */

    // e.respondWith(
    //     caches.match(e.request).then(res => {
    //         if(res) return res;

    //         // fallback
    //         return fetch(e.request).then(newRes => {
    //             console.log('newRes',newRes);
    //             // cache fetched response
    //             caches.open(pwaCache).then(cache => cache.put(e.request, newRes));
    //             return newRes.clone();
    //         }) 
    //     })
    // )



    /* 
    1. cache only static assets - app shell
    */
    // if we delete from cache (devtools) then failed. to solve this we have 2
    
    // e.respondWith(caches.match(e.request));
    

})

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
        return cache.addAll(staticCache);
        
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
