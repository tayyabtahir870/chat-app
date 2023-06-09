// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgr3kNp9noQD8CetyDQ2pb3wf-fRsUqnY",
  authDomain: "chatting-1b8c5.firebaseapp.com",
  projectId: "chatting-1b8c5",
  storageBucket: "chatting-1b8c5.appspot.com",
  messagingSenderId: "833221352407",
  appId: "1:833221352407:web:8e4d96dc67a06a3d1bc992"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth();
export const storage = getStorage();
export const db=getFirestore()