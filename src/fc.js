// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAuH9YKwLmT43w_jVxr1F2VDM_8MgNaC4",
  authDomain: "webp-a53a9.firebaseapp.com",
  projectId: "webp-a53a9",
  storageBucket: "webp-a53a9.appspot.com",
  messagingSenderId: "102514421296",
  appId: "1:102514421296:web:64bba422602ab8e454c7f5"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();