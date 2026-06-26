import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBN8Ob5ZEpwxE-zULGjf2HeaEf9yYC6aXI",
  authDomain: "galaxy-store-95f14.firebaseapp.com",
  projectId: "galaxy-store-95f14",
  storageBucket: "galaxy-store-95f14.firebasestorage.app",
  messagingSenderId: "690671170644",
  appId: "1:690671170644:web:48c3e3fa26c933e52029c1"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);    
export const auth = getAuth(app);