// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth,GoogleAuthProvider} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBhjuucENa5l-b3Wk4svSJ-HH0jGQCV-7Y",
  authDomain: "blogwebp-5c8fd.firebaseapp.com",
  projectId: "blogwebp-5c8fd",
  storageBucket: "blogwebp-5c8fd.appspot.com",
  messagingSenderId: "1000660045942",
  appId: "1:1000660045942:web:932590946264d6a66b8f57"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db  = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(app);

