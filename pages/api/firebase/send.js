// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import firebaseAdmin from "firebase-admin";
import { JWT } from "google-auth-library";

// Fetch the service account key JSON file contents
const serviceAccount = require("/Users/kshirodrameher/Downloads/zeptonow-web-firebase-adminsdk-x95dq-e1722ddc39.json");

if (firebaseAdmin.apps.length === 0) {
  // Initialize the app with a service account, granting admin privileges
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
  });
}

const getAccessToken = () => {
  return new Promise(function (resolve, reject) {
    const key = require("/Users/kshirodrameher/Downloads/zeptonow-web-firebase-adminsdk-x95dq-e1722ddc39.json");
    const jwtClient = new JWT(
      key.client_email,
      null,
      key.private_key,
      ["https://www.googleapis.com/auth/firebase.messaging"],
      null
    );
    jwtClient.authorize(function (err, tokens) {
      if (err) {
        reject(err);
        return;
      }
      resolve(tokens.access_token);
    });
  });
};

const handler = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  try {
    const payload = {
      topic: "test-topic",
      notification: {
        title: "Background Message Title 1982321",
        body: "Background message body 312989321",
      },
      webpush: {
        fcm_options: {
          link: "https://dummypage.com",
        },
      },
    };
    console.log(payload);
    const response = await firebaseAdmin.messaging().send(payload);
    console.log(response);
    res.status(200).send({ status: "success", message: "Message sent" });
  } catch (e) {
    console.log("####", e);
    res.status(500).json({ status: "failed", message: "Failed" });
  }
};

export default handler;
