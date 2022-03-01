import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA9NH_oXczIzeeA9AHpY90NNmyKJV6Qx9c",
  authDomain: "cooking-ninja-site-d2062.firebaseapp.com",
  projectId: "cooking-ninja-site-d2062",
  storageBucket: "cooking-ninja-site-d2062.appspot.com",
  messagingSenderId: "1055031220108",
  appId: "1:1055031220108:web:131f51f811634af89c68a9",
  measurementId: "G-1P2VRYW4HM",
};

//init firebase
firebase.initializeApp(firebaseConfig);

//init services
const projectFirestore = firebase.firestore();

export { projectFirestore };
