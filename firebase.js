// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, setDoc, getFirestore,
  addDoc, getDoc, collection, getDocs,
  updateDoc, query, where, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD4iUkcodexxjbYnqOFqoXsh-ebyPc3vL8",
  authDomain: "post-app-89749.firebaseapp.com",
  projectId: "post-app-89749",
  storageBucket: "post-app-89749.appspot.com",
  messagingSenderId: "1091255567008",
  appId: "1:1091255567008:web:8250b2515eb7a3d7297fc5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export
export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  app,
  setDoc,
  doc,
  db,
  getDoc,
  getDocs,
  addDoc,
  collection,
  deleteDoc,
  updateDoc,
  query,
  where, 
};
