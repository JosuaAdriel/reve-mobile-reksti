// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWwUZA3R4XaDGKlT8MmXbsJu86Im0GMFg",
  authDomain: "reve-database.firebaseapp.com",
  projectId: "reve-database",
  storageBucket: "reve-database.appspot.com",
  messagingSenderId: "459096764748",
  appId: "1:459096764748:web:e53740211a430aefb29fe9",
  measurementId: "G-TK8BXHSPRK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);