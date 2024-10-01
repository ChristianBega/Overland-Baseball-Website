import { storage, db } from "./index.firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc, serverTimestamp, collection } from "firebase/firestore";

export const handleUploadImage = async (file, userUid, setProgress) => {
  try {
    if (!file) {
      console.log("No file provided for upload.");
      throw new Error("No file to upload.");
    }

    const imageRef = ref(storage, `mediaStorage/${file.name}`);

    if (file.size > 10 * 1024 * 1024) {
      throw new Error("File size exceeds the limit."); // 10 MB size limit
    }

    const uploadTask = uploadBytesResumable(imageRef, file);

    // Monitor the upload progress, including any errors that may occur during upload
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Progress updates: track bytes transferred and total size
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/retry-limit-exceeded":
            throw new Error("Max retry time for operation exceeded. Please try again.");
          case "storage/unauthorized":
            throw new Error("User doesn't have permission to access the object.");
          case "storage/canceled":
            throw new Error("User canceled the upload.");
          default:
            throw new Error("Unexpected upload error: " + error.message);
        }
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        const cmsItemDocRef = doc(collection(db, "mediaStorage"));
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
      }
    );
    return { success: true, message: "Uploaded image successfully" };
  } catch (error) {
    console.log("Error during upload:", error.message);
    return { success: false, error: `Unexpected error: ${error.message}` };
  }
};
