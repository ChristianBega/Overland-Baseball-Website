import { doc, setDoc } from "firebase/firestore";
import { db } from "./index.firebase";
import { v4 as uuidv4 } from "uuid";

// parameters - userUid & role
export const addScheduleItem = async (userUid, role, data) => {
  const scheduleItemDocRef = doc(db, "schedule", uuidv4());
  try {
    await setDoc(scheduleItemDocRef, {
      userUid: userUid,
      role: role,
      ...data,
    });
    // Optionally, return some status or the ID of the newly created document
    return { success: true, id: scheduleItemDocRef.id };
  } catch (error) {
    console.error("Error with your request", error);
    throw error;
  }
};
