// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBiqHhV6DtE7XIKixRBT2XdryFkdJiBwhc",
  authDomain: "todo-mvc-f7d5f.firebaseapp.com",
  projectId: "todo-mvc-f7d5f",
  storageBucket: "todo-mvc-f7d5f.appspot.com",
  messagingSenderId: "665477916709",
  appId: "1:665477916709:web:af1e1dbda7d7953e24b7cc",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
