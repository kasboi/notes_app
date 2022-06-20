// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, query, where, getDocs } from "firebase/firestore"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-Y7hJQ3SOrIKlA66-068rYgjpT-oj0_w",
  authDomain: "notes-app-a9f3e.firebaseapp.com",
  projectId: "notes-app-a9f3e",
  storageBucket: "notes-app-a9f3e.appspot.com",
  messagingSenderId: "271349052341",
  appId: "1:271349052341:web:3dcf3b2669a3b494171ffc",
  databaseURL: "https://notes-app-a9f3e-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// Initialize Realtime Database and get a reference to the service
const db = getFirestore(app);

export default app;