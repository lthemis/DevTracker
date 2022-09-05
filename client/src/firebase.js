
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: "devtracker-11db3.firebaseapp.com",
  projectId: "devtracker-11db3",
  storageBucket: "devtracker-11db3.appspot.com",
  messagingSenderId: "172344460026",
  appId: "1:172344460026:web:e9ed0b7ade13bdf77dff43"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);