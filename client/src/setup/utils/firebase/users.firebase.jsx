import { doc, getDoc } from "firebase/firestore";
import { db } from "./index.firebase";

export const getCurrentUserProfile = async (userUid, setCurrentUser) => {
  if (!userUid) return;
  try {
    const currentUserRef = doc(db, "users", userUid);
    const docSnapshot = await getDoc(currentUserRef);
    if (docSnapshot.exists()) {
      const currentUserData = docSnapshot.data();
      return currentUserData;
    } else {
      return { user: null, message: "No user exists" };
    }
  } catch (error) {
    console.error("Error with your request", error);
    throw error;
  }
};
