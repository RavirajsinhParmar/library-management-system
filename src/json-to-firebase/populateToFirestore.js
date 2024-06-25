const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
require("dotenv").config();
const data = require("./Books.json");

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "library-management-syste-99874.firebaseapp.com",
  projectId: "library-management-syste-99874",
  storageBucket: "library-management-syste-99874.appspot.com",
  messagingSenderId: "254552488855",
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const importJSON = async () => {
  for await (const book of data.books) {
    await db.collection("users").doc().set(book);
  }
};

importJSON();
