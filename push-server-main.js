// https://github.com/web-push-libs/web-push

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

if(navigator.serviceWorker){
    navigator.serviceWorker.register('./push-sw.js').then((registration) => {

        // server public key
        const pubKey = "BHYclk6F1s0-4n3V8Ug4f2x01fVEMZAFZJfJE7Ym0TwjP6HSTRtKe0iV1Pn-fN91nBAFniEIakoIFGz9igPz1Y0";

        registration.pushManager.getSubscription().then((sub) => {

            // if subscription found. return
            if(sub){
                return sub;
                // return promise
            }

            // uint array format - string in array format using unsigned 8 bit integers (array buffer)
            let applicationServerKey = urlBase64ToUint8Array(pubKey);

            //subscribe
            return registration.pushManager.subscribe({userVisibleOnly:true, applicationServerKey})
        }).then(sub => sub.toJSON())
        .then(console.log)
        .catch(console.log)
    }).catch(console.log)
}