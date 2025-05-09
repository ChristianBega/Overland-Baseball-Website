import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../utils/firebase/index.firebase"; // Import your db config

/**
 * Partially updates an item in the Firestore collection.
 * @param {string} userUid The UID of the user performing the update.
 * @param {string} role The role of the user (e.g., 'admin').
 * @param {string} docId The document ID of the item to update.
 * @param {Object} data The data to update in the document.
 * @param {string} type The collection type/name.
 * @returns {Promise<Object>} A result object with success status and optionally an error message.
 */

export const updateCMSItem = async (userUid, role, docId, data, type, mainDirectoryName) => {
  console.log("updateCMSItem", userUid, role, docId, data, type, mainDirectoryName);
  if (!userUid || (role !== "admin" && role !== "coach")) return { success: false, message: "Unauthorized or invalid user data" };
  const cmsItemDocRef = doc(db, type || mainDirectoryName, docId);
  const filteredData = Object.fromEntries(Object.entries(data).filter(([_, value]) => value !== undefined && value !== null && value !== ""));
  try {
    await updateDoc(cmsItemDocRef, filteredData);
    return { success: true, id: docId };
  } catch (error) {
    console.error("Error updating document:", error);
    return { success: false, message: "Error updating document", error };
  }
};

// How can i make this a realtime database???
