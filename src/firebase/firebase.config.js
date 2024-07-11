/*
    This code is refered from the website of firebase
*/

// Paired with Firebase it's relatively simple to deliver a safe authentication system that you can use both on the back end and the front end of your application.

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;