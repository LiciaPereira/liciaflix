import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "licia-flix.firebaseapp.com",
  projectId: "licia-flix",
  storageBucket: "licia-flix.firebasestorage.app",
  messagingSenderId: "362531828440",
  appId: "1:362531828440:web:24b95d706abbf6cd1d1dad",
};

export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey);

const app = isFirebaseConfigured ? initializeApp(firebaseConfig) : null;
const db = app ? getFirestore(app) : null;
const previewAuth = {
  onAuthStateChanged: (callback) => {
    callback(null);
    return () => {};
  },
};
const auth = app ? getAuth() : previewAuth;

export { auth };
export default db;

