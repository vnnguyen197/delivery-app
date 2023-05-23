// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite'
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAToGVQ7wS43T-S8IlEudI21COkNuRige8",
  authDomain: "delivery-app-a13fb.firebaseapp.com",
  projectId: "delivery-app-a13fb",
  storageBucket: "delivery-app-a13fb.appspot.com",
  messagingSenderId: "771125572979",
  appId: "1:771125572979:web:f1a1e7348b14a7830fc106",
  measurementId: "G-W55D5VQV3E"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const firebaseApp = initializeApp(firebaseConfig)
export const db = getFirestore(firebaseApp)
export const storage = getStorage(firebaseApp)
export const auth = getAuth(firebaseApp)
