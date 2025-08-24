import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDKqduoroNfLLGeiC0uKDd5nV-QxfkLLXE",
  authDomain: "e-commerce-c83e5.firebaseapp.com",
  projectId: "e-commerce-c83e5",
  storageBucket: "e-commerce-c83e5.appspot.com", // ✅ fixed
  messagingSenderId: "925391088534",
  appId: "1:925391088534:web:4d6e26236cebe9299e8bb7",
  measurementId: "G-B92S33LQD0"
};

const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth }