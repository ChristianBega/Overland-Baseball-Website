import { doc, updateDoc } from "firebase/firestore";
import { db } from "./index.firebase"; // Import your db config

/**
 * Partially updates an item in the Firestore collection.
 * @param {string} userUid The UID of the user performing the update.
 * @param {string} role The role of the user (e.g., 'admin').
 * @param {string} docId The document ID of the item to update.
 * @param {Object} data The data to update in the document.
 * @param {string} type The collection type/name.
 * @returns {Promise<Object>} A result object with success status and optionally an error message.
 */

export const updateCMSItem = async (userUid, role, docId, data, type) => {
  if (!userUid || role !== "admin") return { success: false, message: "Unauthorized or invalid user data" };

  const cmsItemDocRef = doc(db, type, docId);
  try {
    await updateDoc(cmsItemDocRef, data);
    return { success: true, id: docId };
  } catch (error) {
    console.error("Error updating document:", error);
    return { success: false, message: "Error updating document", error };
  }
};

// How can i make this a realtime database???
