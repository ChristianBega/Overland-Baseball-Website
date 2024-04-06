// import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./index.firebase";
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  try {
    const userSnapshot = await getDoc(userDocRef);
    if (!userSnapshot.exists()) {
      const { email, uid } = userAuth;

      const currentDate = new Date();
      const createdAtTimestamp = currentDate.toISOString();
      await setDoc(userDocRef, {
        uid,
        email,
        createdAtTimestamp,
        role: "user",
        ...additionalInfo,
      });
    }
  } catch (error) {
    console.error(error);
  }
  return userDocRef;
};

export const signInAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
  auth.signOut();
};

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);
