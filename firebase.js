// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDS8sUfPvHVrfpDVanR_E0-UsEvNoxxWto",
    authDomain: "instaclone-9d723.firebaseapp.com",
    projectId: "instaclone-9d723",
    storageBucket: "instaclone-9d723.appspot.com",
    messagingSenderId: "779208187532",
    appId: "1:779208187532:web:c4b82b3d81f33c6d29a5a9",
    measurementId: "G-FL4TWP8LKG"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
// const analytics = getAnalytics(app);

export { app, db, storage };