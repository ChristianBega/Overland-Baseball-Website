import { doc, deleteDoc, writeBatch } from "firebase/firestore";

import { db } from "./index.firebase";

export const deleteCMSItem = async (userUid, role, docId, type) => {
  if (!userUid || role !== "admin") return;
  const cmsItemDocRef = doc(db, `${type}`, docId);

  try {
    await deleteDoc(cmsItemDocRef);
    return { success: true, id: docId };
  } catch (error) {
    console.error("Error with your request", error);
    throw error;
  }
};

export const bulkDeleteFromFirebase = async (userUid, role, type, idsToDelete, setProgress) => {
  console.log("bulkDeleteFromFirebase line 20", idsToDelete);
  if (!userUid || role !== "admin") return;
  const batch = writeBatch(db);

  try {
    for (let i = 0; i < idsToDelete.length; i++) {
      const docRef = doc(db, `${type}`, idsToDelete[i]);
      batch.delete(docRef);

      setProgress(((i + 1) / idsToDelete.length) * 100);
    }

    await batch.commit();
    return { success: true, message: "Bulk delete successful!" };
  } catch (error) {
    console.error("Error during bulk delete:", error);
    return { success: false, error: "Error during bulk delete. Check the console for more details." };
  }
};
