// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgZbRtQ0trHZFgkZrdwH6cr_ShQN8heWE",
  authDomain: "iron-restaurant-6d0de.firebaseapp.com",
  projectId: "iron-restaurant-6d0de",
  storageBucket: "iron-restaurant-6d0de.appspot.com",
  messagingSenderId: "585853150574",
  appId: "1:585853150574:web:5ae8b4302e98856bf28d7f",
  measurementId: "G-BG5NNDHH1F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();