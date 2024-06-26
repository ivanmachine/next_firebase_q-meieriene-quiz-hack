// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3D-WDwrsGiSywrNThBB76mm-_sR6wfiA",
  authDomain: "q-meieriene-hack.firebaseapp.com",
  projectId: "q-meieriene-hack",
  storageBucket: "q-meieriene-hack.appspot.com",
  messagingSenderId: "510815312551",
  appId: "1:510815312551:web:43e299e4844fce6e9a1982",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const FirebaseAuthProvider = new GoogleAuthProvider();
export const auth = getAuth();
export const db = getFirestore(app);
