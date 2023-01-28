// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqjsBm4G_-BCMwdQ_DqxSSuQYGMauiPXg",
  authDomain: "myinstagramclone2.firebaseapp.com",
  projectId: "myinstagramclone2",
  storageBucket: "myinstagramclone2.appspot.com",
  messagingSenderId: "585210681344",
  appId: "1:585210681344:web:eece7efa5be14fe376a0e5"
};

// Initialize Firebase
const app = !getApps().length? initializeApp(firebaseConfig):getApp();
const db = getFirestore();
const storage=getStorage();

export {app,db,storage}