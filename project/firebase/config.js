import { initializeApp } from "firebase/app";
// import "firebase/firestore";
// import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAgAtNpZiqufKJ3mT61Q5alE1onHlDyrKw",
  authDomain: "goit-react-native-8f12b.firebaseapp.com",
  projectId: "goit-react-native-8f12b",
  storageBucket: "goit-react-native-8f12b.appspot.com",
  messagingSenderId: "451271538613",
  appId: "1:451271538613:web:c40b3440138e270f474bfc",
  measurementId: "G-QBFFJRFLP3",
};

const app = initializeApp(firebaseConfig);

export default app;

// export const storage = firebase.storage();
// export const fstore = firebase.firestore();
