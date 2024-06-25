// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9theFea5kuBnzHKzKda6l7nIsU1Ykan4",
  authDomain: "library-management-syste-99874.firebaseapp.com",
  projectId: "library-management-syste-99874",
  storageBucket: "library-management-syste-99874.appspot.com",
  messagingSenderId: "254552488855",
  appId: "1:254552488855:web:b82a2e87639bb15490a2d2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
