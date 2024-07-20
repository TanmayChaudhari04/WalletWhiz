// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDywBge6ruf8UC5ZVOAySieRhOamNu9B_8",
  authDomain: "wallet-whiz-348b8.firebaseapp.com",
  projectId: "wallet-whiz-348b8",
  storageBucket: "wallet-whiz-348b8.appspot.com",
  messagingSenderId: "7106416223",
  appId: "1:7106416223:web:9ccaa6075616decaf095ea",
  measurementId: "G-RBPQQG6H8Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {db, auth, provider, doc, setDoc};