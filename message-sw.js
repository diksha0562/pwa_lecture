self.addEventListener('message', (e) =>{
    // if(e.data === 'update_self'){
    //     console.log('service worker updating');
    //     // forcing the new sw to takeover the active one
    //     self.skipWaiting();
    // }
    console.log(e.data);

    // respond to all client

    // self.clients.matchAll() - returns all active clients, this returns a promise
    self.clients.matchAll().then(clients => {
        clients.forEach(client => {
            console.log('client', client.id, e.source.id);

            // e.source.id - id of client that is sending msg
            if(e.source.id === client.id){
                client.postMessage(' private hello from sw'); 
            }
            client.postMessage('hello from sw');
        });
    })
})