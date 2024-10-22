import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBjn38x917ynhbz6Q7ytZKlp7VxPUHmsao",
  authDomain: "liciaflix.firebaseapp.com",
  projectId: "liciaflix",
  storageBucket: "liciaflix.appspot.com",
  messagingSenderId: "78166367626",
  appId: "1:78166367626:web:365787e02cbaf8a29f7c73",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export { auth };
export default db;
