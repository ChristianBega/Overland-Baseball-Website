import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "./index.firebase";

export const fetchCMSItem = async (type) => {
  if (!type) {
    console.error("Type is required");
    return null;
  }
  try {
    const cmsItemsCollection = collection(db, type);
    const docSnapshot = await getDocs(cmsItemsCollection);

    const documents = [];

    docSnapshot.forEach((doc) => {
      if (doc.exists()) {
        const data = doc.data();
        documents.push(data);
      } else {
        console.log("Document does not exist.");
      }
    });
    return documents;
  } catch (error) {
    console.error("Error fetching document: ", error);
    throw error;
  }
};
