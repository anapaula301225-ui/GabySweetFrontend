importScripts(
'https://www.gstatic.com/firebasejs/11.10.0/firebase-app-compat.js'
);

importScripts(
'https://www.gstatic.com/firebasejs/11.10.0/firebase-messaging-compat.js'
);



firebase.initializeApp({

  apiKey: "AIzaSyCbzun3Be-VF6Xu2WJBtFGABa0SQ7T2EX4",

  authDomain: "gabysweet-657ca.firebaseapp.com",

  projectId: "gabysweet-657ca",

  storageBucket: "gabysweet-657ca.firebasestorage.app",

  messagingSenderId: "177305118318",

  appId: "1:177305118318:web:92288e4f97124a629ee87f"

});



const messaging = firebase.messaging();





messaging.onBackgroundMessage(

(payload) => {



    console.log(

        'Mensaje en segundo plano:',

        payload

    );





    const titulo =

    payload.notification?.title

    || 'GabySweet';



    const opciones = {


        body:

        payload.notification?.body

        || 'Tienes una nueva notificación',



        icon:'/img/GabySweet_logo_.png',



        badge:'/img/GabySweet_logo_.png'


    };






    self.registration.showNotification(

        titulo,

        opciones

    );



}

);