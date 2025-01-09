// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCr_so0YbX81aD4OznEgO4iuV_fDmBKSxI",
  authDomain: "quickventory-31ffd.firebaseapp.com",
  projectId: "quickventory-31ffd",
  storageBucket: "quickventory-31ffd.firebasestorage.app",
  messagingSenderId: "785585971805",
  appId: "1:785585971805:web:fcddc41191bf4813f123b4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth };
