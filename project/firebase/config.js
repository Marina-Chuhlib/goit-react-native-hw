import firebase from "firebase";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "DOMAIN",
  databaseURL: "URL",
  projectId: "PROJECT_ID",
  storageBucket: "STORAGE",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export { auth };
