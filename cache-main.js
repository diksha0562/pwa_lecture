// if(window.caches){
//     caches.open('test2'); // create cache if doesn't exist 
//     caches.keys().then(console.log); // returns promise which provide cache array
//     caches.has('test1').then(console.log); // returns true or false if cache exist
//     caches.delete('test1').then(console.log);  // return true if deleted , if not present false
// }

if(window.caches){
    caches.open('pwa-v1.1').then(cache => {
        // cache.add('/index.html');
        cache.addAll([
            '/index.html',
            '/cache-main.js',
            '/style.css'
        ]);
        // cache.match('index.html').then(console.log);
       
        cache.put('index.html', new Response('my own html'));
         cache.match('index.html').then(res =>{
            res.text().then(console.log);
        });
cache.keys().then(console.log);
    })
}