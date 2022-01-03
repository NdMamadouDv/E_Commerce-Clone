// Import the functions you need from the SDKs you need
import firebase from "firebase";
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyD6TRYp-zkSxuvAGBqmpyV7LG1WTS86KMs",

  authDomain: "clone-23198.firebaseapp.com",

  projectId: "clone-23198",

  storageBucket: "clone-23198.appspot.com",

  messagingSenderId: "159574708921",

  appId: "1:159574708921:web:8b29af92f96d04a2384168",
};

// Initialize Firebase

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
export default db;
