import { collection, doc, getDoc, getDocs, onSnapshot } from "firebase/firestore";
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

// Real-time listener for CMS Items
export const subscribeToCMSItems = (type, onUpdate, onError) => {
  if (!type) {
    console.error("Type is required");
    return () => {};
  }

  try {
    const cmsItemsCollectionRef = collection(db, type);

    const unsubscribe = onSnapshot(
      cmsItemsCollectionRef,
      (snapshot) => {
        const cmsItems = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        onUpdate(cmsItems);
      },
      (error) => {
        console.error("Error subscribing to CMS items:", error);
        if (onError) onError(error);
      }
    );

    return unsubscribe; // Return the unsubscribe function
  } catch (error) {
    console.error("Error in real-time subscription: ", error);
    if (onError) onError(error);
    return () => {};
  }
};
