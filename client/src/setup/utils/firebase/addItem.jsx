import { doc, setDoc, writeBatch, collection, serverTimestamp } from "firebase/firestore";

import { db } from "./index.firebase";
import { v4 as uuidv4 } from "uuid";

export const addCMSItem = async (userUid, role, data, type) => {
  if (!userUid || role !== "admin") return;
  const docId = uuidv4();
  const cmsItemDocRef = doc(db, `${type}`, docId);
  const filteredData = Object.fromEntries(Object.entries(data).filter(([_, value]) => value !== undefined && value !== null && value !== ""));
  try {
    await setDoc(cmsItemDocRef, {
      createdAt: serverTimestamp(),
      id: docId,
      createdByUserUid: userUid,
      ...filteredData,
      // ...data,
    });
    return { success: true, id: cmsItemDocRef.id, message: "Created Item successfully!" };
  } catch (error) {
    console.error("Error with your request", error);
    throw error;
  }
};

export const bulkAddToFirebase = async (userUid, role, type, csvData, setProgress) => {
  if (!userUid || role !== "admin") return;
  const batch = writeBatch(db);
  const collectionRef = collection(db, `${type}`);
  try {
    for (let i = 0; i < csvData.length; i++) {
      const docRef = doc(collectionRef);
      const documentId = docRef.id;
      const documentData = {
        ...csvData[i],
        id: documentId,
        addedByUserUid: userUid,
        createdAt: serverTimestamp(),
      };
      batch.set(docRef, documentData);

      // Update progress
      setProgress(((i + 1) / csvData.length) * 100);
    }

    // Commit the batch
    await batch.commit();
    // ! create returns objects for success
    return { success: true, message: "Bulk upload successful!" };
  } catch (error) {
    // ! create returns objects for failure
    console.error("Error during bulk upload:", error);
    alert("Error during bulk upload. Check the console for more details.");
  }
};
