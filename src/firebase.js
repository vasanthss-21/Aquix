// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAnfCL4DcV2Fh18Mb-OzhuvCZbUs5GL9qw",
  authDomain: "aquix-fe1b6.firebaseapp.com",
  projectId: "aquix-fe1b6",
  storageBucket: "aquix-fe1b6.firebasestorage.app",
  messagingSenderId: "33829244795",
  appId: "1:33829244795:web:0d3e4e6cd294e1f7f3f7de",
  measurementId: "G-HD2G4ZJYTZ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app); // Added storage

export { app, db, auth, storage };