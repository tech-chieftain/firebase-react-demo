// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABHbieRkr82-AWCR8Hha-0Cr5gh-H_XNM",
  authDomain: "recoded-firebase-demo.firebaseapp.com",
  projectId: "recoded-firebase-demo",
  storageBucket: "recoded-firebase-demo.appspot.com",
  messagingSenderId: "929416023447",
  appId: "1:929416023447:web:47d5d676683253a71748d2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
