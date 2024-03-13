// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRuQIidrNS4OLq3bAGzXF6qHZXocYvxqI",
  authDomain: "prakhar-portfolio-ce872.firebaseapp.com",
  projectId: "prakhar-portfolio-ce872",
  storageBucket: "prakhar-portfolio-ce872.appspot.com",
  messagingSenderId: "741567686623",
  appId: "1:741567686623:web:3f74c94875a7517e42466a",
  measurementId: "G-6TNV37C9JL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);