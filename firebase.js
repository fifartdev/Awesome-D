// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkl_ehFgqtmEb3KB35qRHvOqkN9Ii4DgU",
  authDomain: "fbauth-7f629.firebaseapp.com",
  projectId: "fbauth-7f629",
  storageBucket: "fbauth-7f629.appspot.com",
  messagingSenderId: "17679496376",
  appId: "1:17679496376:web:c41192dca4da170037704d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
