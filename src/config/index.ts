// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC32Ysq36BdQB3M1eVwc4Y0yWM-lbif5IA",
  authDomain: "trader-notes-app.firebaseapp.com",
  projectId: "trader-notes-app",
  storageBucket: "trader-notes-app.appspot.com",
  messagingSenderId: "48956228993",
  appId: "1:48956228993:web:869645df56e74c75575480",
  measurementId: "G-QLRYFF4D76",
};

// Initialize Firebase

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore();
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const analytics = getAnalytics(FIREBASE_APP);
