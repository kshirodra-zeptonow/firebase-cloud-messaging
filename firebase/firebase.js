/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
// import { doc, getFirestore, setDoc } from "firebase/firestore";
import localforage from "localforage";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCU0Stp8YFNJwWKSKQIGlxG2Is4L_wRwzI",
  authDomain: "zeptonow-web.firebaseapp.com",
  projectId: "zeptonow-web",
  storageBucket: "zeptonow-web.appspot.com",
  messagingSenderId: "448281329110",
  appId: "1:448281329110:web:d0c65c5121330135ea7877",
  measurementId: "G-VMQVXPPSFM",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const db = getFirestore();

const subscribeToTopic = async (token) => {
  try {
    const response = await  fetch(
      "https://9654-2406-7400-63-a6f7-54f1-4232-4b9d-43ae.ngrok-free.app/api/firebase/subscribe",
      {
        method: "POST",
        body: JSON.stringify({
          token,
          topic: "test-topic"
        })
      }
    );
    if (response.status < 200 || response.status >= 400) {
      throw (
        "Error subscribing to topic: " +
        response.status +
        " - " +
        response.text()
      );
    }
  } catch (e) {
    console.error(e);
    // handle error
  }
};

const firebaseCloudMessaging = {
  tokenInlocalforage: async () => {
    const token = await localforage.getItem("fcm_token");
    await subscribeToTopic(token);
    console.log("fcm_token tokenInlocalforage", token);
    return token;
  },
  onMessage: async () => {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      alert("Notificacion");
    });
  },

  init: async function () {
    try {
      if ((await this.tokenInlocalforage()) !== null) {
        console.log("it already exists");
        return false;
      }
      console.log("it is creating it.");
      const messaging = getMessaging(app);
      await Notification.requestPermission();
      getToken(messaging, {
        vapidKey:
          "BHbtqG4sx7FEQD6l6Zq3B5GFyDsI0lOkODbqrbXIQU8uIiombTsIKkdWU0UvZbliYtYTQVwJCV09TWTnkjU7j1E",
      })
        .then(async (currentToken) => {
          console.log("current Token", currentToken);
          if (currentToken) {
            // Send the token to your server and update the UI if necessary
            // save the token in your database
            localforage.setItem("fcm_token", currentToken);
            console.log("fcm_token", currentToken);
            // await subscribeToTopic(currentToken); // todo: uncomment 

          } else {
            // Show permission request UI
            console.log(
              "NOTIFICACION, No registration token available. Request permission to generate one."
            );
            // ...
          }
        })
        .catch((err) => {
          console.log(
            "NOTIFICACIONAn error occurred while retrieving token . "
          );
          console.log(err);
        });
    } catch (error) {
      console.error(error);
    }
  },
};

export { firebaseCloudMessaging };
