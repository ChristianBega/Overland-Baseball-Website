// ! DEPRECATED - REMOVE SOON!!!!
import { db } from "./index.firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

/**
 * Updates all documents in a specified collection with given key/value pairs
 * @param {string} collectionName - Name of the collection to update
 * @param {Object} fieldsToAdd - Object containing key/value pairs to add to each document
 * @returns {Promise} Promise that resolves when all updates are complete
 */
export const addFieldsToCollection = async (collectionName, fieldsToAdd) => {
  try {
    const collectionRef = collection(db, collectionName);

    const querySnapshot = await getDocs(collectionRef);

    const updatePromises = querySnapshot.docs.map((document) => {
      const docRef = doc(db, collectionName, document.id);
      return updateDoc(docRef, fieldsToAdd);
    });

    await Promise.all(updatePromises);

    console.log(`Successfully updated ${querySnapshot.size} documents in ${collectionName}`);
    return true;
  } catch (error) {
    console.error("Error updating documents:", error);
    throw error;
  }
};

// Example usage
export const initializeBulkAddFields = () => {
  const fieldsConfig = {
    mainDirectory: "events",
    sourceDirectory: "eventImages",
    collectionName: "eventImages",
  };

  const fieldsToAdd = {
    mainDirectory: fieldsConfig.mainDirectory,
    sourceDirectory: fieldsConfig.sourceDirectory,
  };

  addFieldsToCollection(fieldsConfig.collectionName, fieldsToAdd)
    .then(() => {
      console.log("Successfully added fields to opponentIcon collection");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
