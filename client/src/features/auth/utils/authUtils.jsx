import { auth, db } from "../../../utils/firebase/index.firebase";
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ROLES } from "../utils/roles";

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

// Helper function to update last login
const updateLastLogin = async (uid) => {
  const userDocRef = doc(db, "users", uid);
  try {
    await setDoc(
      userDocRef,
      {
        lastLoginTimestamp: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Error updating last login:", error);
  }
};

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
      const { userName, role = ROLES.USER } = additionalInfo;

      // Validate role
      if (!Object.values(ROLES).includes(role)) {
        throw new Error(`Invalid role: ${role}`);
      }

      const userData = {
        uid,
        email,
        userName,
        role,
        createdAtTimestamp: new Date().toISOString(),
        lastLoginTimestamp: new Date().toISOString(),
        accountStatus: "active",
        profileComplete: false,
      };

      await setDoc(userDocRef, userData);
      return userData;
    }

    return userSnapshot.data();
  } catch (error) {
    console.error("Error creating/updating user document:", error);
    throw error;
  }
};

export const signInAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  const result = await signInWithEmailAndPassword(auth, email, password);
  if (result.user) {
    await updateLastLogin(result.user.uid);
  }
  return result;
};

export const signOutUser = async () => {
  await auth.signOut();
};

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      await updateLastLogin(user.uid);
    }
    callback(user);
  });
