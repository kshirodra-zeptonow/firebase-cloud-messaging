importScripts("https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyCU0Stp8YFNJwWKSKQIGlxG2Is4L_wRwzI",
  authDomain: "zeptonow-web.firebaseapp.com",
  projectId: "zeptonow-web",
  storageBucket: "zeptonow-web.appspot.com",
  messagingSenderId: "448281329110",
  appId: "1:448281329110:web:d0c65c5121330135ea7877",
  measurementId: "G-VMQVXPPSFM",
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
