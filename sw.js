console.log('sw');

self.addEventListener('install', (e)=>{
    console.log('sw install event');
    // async tasks like cache for that page for that time we don't want sw to move to activate
    let installPromise = new Promise((resolve)=>{
        setTimeout(resolve, 5000);
    })
    e.waitUntil(installPromise);
    // take promise as its first argument after resolving it moves from install
});

self.addEventListener('activate', (e)=>{
    // sw takeover correctly from old one
    // let activatePromise = new Promise((resolve)=>{
    //     setTimeout(resolve, 3000);
    // })
    // e.waitUntil(activatePromise);

// by default then a new service worker doesn't simply take over from an existing one this ensures clients viewing pages controlled by an existing worker isn't suddenly being controlled by a new worker doing so could cause a lot of client-side problems and would make managing page content very difficult
    console.log('new sw2 activated');
});