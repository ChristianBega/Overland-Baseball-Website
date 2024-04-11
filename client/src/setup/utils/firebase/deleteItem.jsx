import { doc, deleteDoc } from "firebase/firestore";

import { db } from "./index.firebase";

export const deleteCMSItem = async (userUid, role, docId, type) => {
  if (!userUid || role !== "admin") return; // Check for user role and existence

  const cmsItemDocRef = doc(db, `${type}`, docId); // Reference to the document to delete

  try {
    await deleteDoc(cmsItemDocRef); // Attempt to delete the document
    return { success: true, id: docId }; // Return success and the ID of the deleted document
  } catch (error) {
    console.error("Error with your request", error); // Log any errors
    throw error; // Re-throw the error for further handling
  }
};
