import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDdxEZNtUhsN_MFBtTGyZdO92qOVonyy00",
  authDomain: "ai-trip-73f3e.firebaseapp.com",
  projectId: "ai-trip-73f3e",
  storageBucket: "ai-trip-73f3e.firebasestorage.app",
  messagingSenderId: "502919445865",
  appId: "1:502919445865:web:7c0a08b043a4fa90f9d1f8",
  measurementId: "G-4NJK0XV8HY",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
