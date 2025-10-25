import { auth, db } from "../../../utils/firebase/index.firebase";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ROLES } from "../utils/roles";

// ==========================================
// OAuth Providers
// ==========================================

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

const facebookProvider = new FacebookAuthProvider();

// ==========================================
// Helper Functions
// ==========================================

// Helper function to update last login
const updateLastLogin = async (uid) => {
  const userDocRef = doc(db, "users", uid);
  try {
    const userSnapshot = await getDoc(userDocRef);
    if (userSnapshot.exists()) {
      await setDoc(
        userDocRef,
        {
          lastLoginTimestamp: new Date().toISOString(),
        },
        { merge: true }
      );
    }
  } catch (error) {
    console.error("Error updating last login:", error);
  }
};

// ==========================================
// Email/Password Authentication
// ==========================================

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
      // ✅ SECURITY: Only accept userName from additionalInfo, NEVER accept role
      const { userName } = additionalInfo;

      const userData = {
        uid,
        email,
        userName: userName || email.split("@")[0], // Fallback to email username
        role: ROLES.USER, // ✅ ALWAYS default to 'user' - no exceptions
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

/**
 * Send password reset email via Firebase
 * @param {string} email - User's email address
 */
export const sendPasswordResetEmailFirebase = async (email) => {
  if (!email) throw new Error("Email is required");
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    console.error("Password reset error:", error);
    throw error;
  }
};

// ==========================================
// OAuth Authentication (Google & Facebook)
// ==========================================

// Google Sign In
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Create user document if it doesn't exist (with default role)
    await createUserDocumentFromAuth(user, {
      userName: user.displayName || user.email.split("@")[0],
    });

    await updateLastLogin(user.uid);
    return result;
  } catch (error) {
    console.error("Google sign-in error:", error);

    // Handle specific errors
    if (error.code === "auth/popup-closed-by-user") {
      throw new Error("Sign-in cancelled");
    }
    if (error.code === "auth/popup-blocked") {
      throw new Error("Pop-up blocked by browser. Please allow pop-ups and try again.");
    }

    throw error;
  }
};

// Facebook Sign In
export const signInWithFacebook = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    const user = result.user;

    // Create user document if it doesn't exist (with default role)
    await createUserDocumentFromAuth(user, {
      userName: user.displayName || user.email.split("@")[0],
    });

    await updateLastLogin(user.uid);
    return result;
  } catch (error) {
    console.error("Facebook sign-in error:", error);

    // Handle specific errors
    if (error.code === "auth/popup-closed-by-user") {
      throw new Error("Sign-in cancelled");
    }
    if (error.code === "auth/popup-blocked") {
      throw new Error("Pop-up blocked by browser. Please allow pop-ups and try again.");
    }
    if (error.code === "auth/account-exists-with-different-credential") {
      throw new Error("An account already exists with this email. Try signing in with a different method.");
    }

    throw error;
  }
};
