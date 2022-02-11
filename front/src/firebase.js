import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA0ccHSP5g4atFrWLfjFTSoSZOlTPADPdY",
  authDomain: "edu-fileserver-5b3a2.firebaseapp.com",
  projectId: "edu-fileserver-5b3a2",
  storageBucket: "edu-fileserver-5b3a2.appspot.com",
  messagingSenderId: "481495435626",
  appId: "1:481495435626:web:b221aa02a2a8e08f763d13",
  measurementId: "G-P0HB1266SX",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const storageRef = storage.ref();

export default storageRef;
