import { useEffect, useContext } from "react";
import { initializeApp } from "firebase/app";
import { TweetsContext } from "../Context/Context";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCuweMYHOC3KkcpdVCRq7Itm6zQfwkyt_w",
  authDomain: "micro-blog-b2549.firebaseapp.com",
  projectId: "micro-blog-b2549",
  storageBucket: "micro-blog-b2549.appspot.com",
  messagingSenderId: "848118116677",
  appId: "1:848118116677:web:cdd7642e82723ea8dc4e2c",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

const db = getFirestore();
export default db;

export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

export const storage = getStorage(app);

export function useAuth() {
  const { currentUser, setCurrentUser, setUserData } =
    useContext(TweetsContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const docRef = doc(db, "users", user?.email);
        const dockSnap = await getDoc(docRef);
        setUserData(dockSnap.data());
      }
    });
    return unsubscribe;
  }, [setUserData, setCurrentUser]);

  return currentUser;
}
