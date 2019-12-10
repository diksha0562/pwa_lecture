self.addEventListener('activate', ()=>{
    console.log('sw activated');
});

self.addEventListener('fetch', (e)=>{
    console.log('e.request.url', e.request.url);
});