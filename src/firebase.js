import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDbJiR9NHxC10dPUrk5LcGLGRxgUBL-0Ms",
  authDomain: "licia-flix.firebaseapp.com",
  projectId: "licia-flix",
  storageBucket: "licia-flix.firebasestorage.app",
  messagingSenderId: "362531828440",
  appId: "1:362531828440:web:24b95d706abbf6cd1d1dad",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export { auth };
export default db;
