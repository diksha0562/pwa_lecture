function showNotification(){
    // console.log('new notification');
    let notiOPts={
        body:'notification body'
    }
    let n = new Notification('my new noti', notiOPts);
    n.onclick = ()=>{
        console.log('notification clicked');
    }

}

if(window.Notification){
    // manage permission (granted, denied, default)
console.log('Notification.permission',Notification.permission);
    // if we already have permission
    if(Notification.permission === 'granted'){
        showNotification();
    }else if(Notification.permission !== 'denied'){
        Notification.requestPermission((permission) => {
            if(permission === 'granted'){
                showNotification();
            }
        });
    }

}

