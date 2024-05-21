// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBZpiwP2zDafojfOVCI9vplJs0SKQ5PSA8",
  authDomain: "managme-7e78d.firebaseapp.com",
  projectId: "managme-7e78d",
  storageBucket: "managme-7e78d.appspot.com",
  messagingSenderId: "366995149560",
  appId: "1:366995149560:web:2a87408f8e341865c1a10d"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);