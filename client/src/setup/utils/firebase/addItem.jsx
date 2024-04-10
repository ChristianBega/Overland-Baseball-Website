import { doc, setDoc } from "firebase/firestore";
// collection, writeBatch;
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { db } from "./index.firebase";
import { v4 as uuidv4 } from "uuid";

export const addCMSItem = async (userUid, role, data, type) => {
  if (!userUid || role !== "admin") return;
  console.log(data);

  const cmsItemDocRef = doc(db, `${type}`, uuidv4());
  try {
    await setDoc(cmsItemDocRef, {
      addedByUserUid: userUid,
      ...data,
    });
    return { success: true, id: cmsItemDocRef.id };
  } catch (error) {
    console.error("Error with your request", error);
    throw error;
  }
};

// export function bulkAddDocuments(documents) {
//   const batch = writeBatch(db);
//   const collectionRef = collection(db, "roster");

//   documents.forEach((documentData) => {
//     const docRef = doc(collectionRef); // Correctly generates a new document ID
//     batch.set(docRef, documentData);
//   });

//   // Commit the batch
//   batch
//     .commit()
//     .then(() => {
//       console.log("Documents successfully added!");
//     })
//     .catch((error) => {
//       console.error("Error adding documents: ", error);
//     });
// }
