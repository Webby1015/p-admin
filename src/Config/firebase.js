// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDaE1vWJQXpEn8xU_vCRAmKkKCA-rtAQes",
  authDomain: "p-portfolio-d64b1.firebaseapp.com",
  projectId: "p-portfolio-d64b1",
  storageBucket: "p-portfolio-d64b1.appspot.com",
  messagingSenderId: "985895826934",
  appId: "1:985895826934:web:501b5e81bb380160b343d7",
  measurementId: "G-MJEF0CDRFH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)