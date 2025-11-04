
// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebase = {
  apiKey: "AIzaSyDK4w7LS2AXHI_HYkhRo9bJxtDt8N185zA",
  authDomain: "neon-time.firebaseapp.com",
  projectId: "neon-time",
  storageBucket: "neon-time.firebasestorage.app",
  messagingSenderId: "...",
  appId: "92973822757",
  // measurementId: "G-TYYJKCC0WP"
};

const app = initializeApp(firebase);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
