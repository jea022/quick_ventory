import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';



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
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
