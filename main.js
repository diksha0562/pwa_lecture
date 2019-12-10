// Progressive enhancement (SW supported)

// if('serviceWorker' in navigator){
if (navigator.serviceWorker) {
    // register the sw

    navigator.serviceWorker.register('/cachingStrtegies-sw.js')
        .then(function (registration) {

            console.log('sw registered', registration);
            if (registration.active) {

                registration.active.postMessage('hey');
            }
            // registration.onupdatefound = () => {
            //     let newSw = registration.installing;

            //     //prompt msg
            //     if (confirm('App update found. Do you want to update now')) {
            //         newSw.postMessage('update_self');
            //     }
            // }


            // when new sw found
            // registration.onupdatefound = ()=>{
            //     console.log('new sw found');
            //     console.log(registration.installing);
            //     let newSw = registration.installing;
            //     newSw.onstatechange = ()=>{
            //         console.log(newSw.state); // installed, activating, activated
            //     }
            // }

        })
        .catch(console.log('erro'))
};

// sw registered
// sw install event
// sw activate event


// get camera feed

// fetch('camera_feed.html').then((res) => {
//     return res.text();
// }).then((html) => {
//     document.getElementById('camera').innerHTML = html;
// })



// listen msg 

// navigator.serviceWorker.addEventListener('message', (e) => {
//     console.log(e.data);
// })

