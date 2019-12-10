// send notification on push - sw

self.addEventListener('push',(e)=>{
    // same registration object we get on registering worker
    let n = self.registration.showNotification('notification from push server');
    e.waitUntil(n);

});