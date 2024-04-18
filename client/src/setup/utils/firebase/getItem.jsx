import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "./index.firebase";

export const fetchCMSItems = async (type) => {
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

export const fetchCMSItemById = async (type, id) => {
  if (!type || !id) {
    console.error("Type and ID are required");
    return null;
  }
  try {
    const documentRef = doc(db, type, id);
    const documentSnapshot = await getDoc(documentRef);

    if (documentSnapshot.exists()) {
      const data = documentSnapshot.data();
      return data;
    } else {
      console.log("Document does not exist.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching document: ", error);
    throw error;
  }
};
