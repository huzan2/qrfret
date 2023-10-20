import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCu3R_S-BqFRKTkZ1M3Z3EW1BNQBMPp9L4",
  authDomain: "qrfret.firebaseapp.com",
  databaseURL:
    "https://qrfret-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "qrfret",
  storageBucket: "qrfret.appspot.com",
  messagingSenderId: "1049968395823",
  appId: "1:1049968395823:web:f36b2d40a7bbd38da168da",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const dbref = ref(db);