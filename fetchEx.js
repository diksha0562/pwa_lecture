self.addEventListener('fetch', (e)=>{
    console.log('fetch event', e.request.url);

    if(e.request.url.endsWith('style.css')){
        // console.log('fetch event for style', e.request.url);
        e.respondWith(fetch('/style2.css'));
        // here sw is acting as a proxy then as in source we will see style.css but with content style2.css
    }

    if(e.request.url.endsWith('/greet')){
        let headers = new Headers({'COntent-Type':'text/html'});
        let customResponse = new Response('<h1>Hello</h1>', {headers});
        e.respondWith(customResponse);
    }

    // if suppose dynamic content and failed due to poor connection 

    if(e.request.url.endsWith('/camera_feed.html')){
        e.respondWith(
            fetch(e.request)
            .then((res)=>{
                if(res.ok) return res;
                return new Response('camera feed not available');
            })
        );
    }
});