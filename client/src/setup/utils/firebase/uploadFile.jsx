import { storage, db } from "./index.firebase";
import { ref, uploadBytesResumable, getDownloadURL, getStorage, uploadBytes, deleteObject } from "firebase/storage";
import { doc, setDoc, serverTimestamp, collection } from "firebase/firestore";

export const handleUploadFile = (file, userUid, setProgress, onCancel, mainDirectoryName = "mediaStorage", subDirectoryName = "") => {
  return new Promise((resolve, reject) => {
    try {
      if (!file) {
        console.log("No file provided for upload.");
        reject(new Error("No file to upload."));
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        reject(new Error("File size exceeds the limit.")); // 10 MB size limit
        return;
      }

      const fileRef = ref(storage, `${mainDirectoryName}/${subDirectoryName ? subDirectoryName + "/" : ""}${file.name}`);
      const uploadTask = uploadBytesResumable(fileRef, file);

      onCancel(() => {
        uploadTask.cancel();
        reject(new Error("Upload cancelled"));
      });

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);

          switch (snapshot.state) {
            case "paused":
              console.log("LINE 3 ------ utils/firebase/uploadFile.jsx", "Upload is paused");
              break;
            case "running":
              console.log("LINE 3 ------ utils/firebase/uploadFile.jsx", "Upload is running");
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case "storage/retry-limit-exceeded":
              reject(new Error("Max retry time for operation exceeded. Please try again."));
              break;
            case "storage/unauthorized":
              reject(new Error("User doesn't have permission to access the object."));
              break;
            case "storage/canceled":
              reject(new Error("User canceled the upload."));
              break;
            default:
              reject(new Error("Unexpected upload error: " + error.message));
          }
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          const cmsItemDocRef = doc(collection(db, subDirectoryName ? subDirectoryName : mainDirectoryName));
          const docId = cmsItemDocRef.id;

          await setDoc(cmsItemDocRef, {
            id: docId,
            createdAt: serverTimestamp(),
            createdByUserUid: userUid,
            url: downloadURL,
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
          });

          resolve({ success: true, message: "Uploaded file successfully", url: downloadURL });
        }
      );

      // Return the uploadTask
      return uploadTask;
    } catch (error) {
      console.log("Error during upload:", error.message);
      reject({ success: false, error: `Unexpected error: ${error.message}` });
    }
  });
};

export const getDownloadableUrl = async (filePath) => {
  try {
    const storage = getStorage();

    const downloadUrl = await getDownloadURL(ref(storage, filePath));

    return downloadUrl;
  } catch (error) {
    console.error("Error getting download URL:", error);
    throw new Error("Failed to retrieve download URL.");
  }
};

export const handleUpdateImage = async (userUid, role, originalFileNameWithExt, newFileNameWithExt, cmsType, mainDirectoryName) => {
  if (!userUid || role !== "admin") return { success: false, message: "Unauthorized or invalid user data" };

  try {
    // 1. Reference to the original file in Firebase Storage
    const oldFileRef = ref(storage, `${mainDirectoryName ? `${mainDirectoryName}/` : ""}${cmsType}/${originalFileNameWithExt}`);
    // 2. Reference to the new file path
    const newFileRef = ref(storage, `${mainDirectoryName ? `${mainDirectoryName}/` : ""}${cmsType}/${newFileNameWithExt}`);
    // 3. Copy the file by uploading to the new location
    const oldFileSnapshot = await getDownloadURL(oldFileRef);
    const fileResponse = await fetch(oldFileSnapshot);
    const fileBlob = await fileResponse.blob();
    await uploadBytes(newFileRef, fileBlob);
    // 4. Get the new download URL
    const newDownloadURL = await getDownloadURL(newFileRef);
    // 5. Delete the original file from Storage
    await deleteObject(oldFileRef);
    // Return the new download URL
    return { success: true, newDownloadURL };
  } catch (error) {
    console.error("Error renaming file in Firebase Storage: ", error);
    return { success: false, error };
  }
};    
