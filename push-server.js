// web push module

const webPush = require('web-push');
const vapid = require('./vapid.json');

// configure keys
webPush.setVapidDetails(
    'mailto: diksha@gmail.com',
    vapid.publicKey,
    vapid.privateKey
);

const pushSubscription = {
    endpoint: 'https://fcm.googleapis.com/fcm/send/d0Ka7ncMTA8:APA91bHboQd07DvwINbT6PmfnjeWOpbtpmOaOUPSFLiq_aopiGVSRv-EjjFkfZH4SSYLBp8oH3wgqO8Rf1WhCavMcjMUBmmrj3wyhhfTYj03hk1Glh9vWkEriig0kHoXj9KSq8YHooQ5',
    keys:{
        auth: "isIb4ZHfu2NwzBnRJxkDjQ",
        p256dh:"BMqg7z7gQ0r8nDE7Qd8lxuWc4oVFQHJGEuDQlk6kD1MDl8CwGF0TjiZPGa-ytIbLeFl0km9nLvhb-81wt9Ecyr8"
    }
}

webPush.sendNotification(pushSubscription, 'notigication from push server');
console.log('push sent to client');

// ./node_modules/web-push/src/cli.js
// it allows us to generate key pair for use in push server

