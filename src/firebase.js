// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyA26vc7UCSgM-YIGdTwpadgLtsQkKe54l8",

  authDomain: "login-social-media-app.firebaseapp.com",

  projectId: "login-social-media-app",

  storageBucket: "login-social-media-app.appspot.com",

  messagingSenderId: "836334346160",

  appId: "1:836334346160:web:89ec84a1f414b3d36c4075",

  measurementId: "G-DBXVMW0XMJ",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;
