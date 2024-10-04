import { storage, db } from "./index.firebase";
import { ref, uploadBytesResumable, getDownloadURL, getStorage } from "firebase/storage";
import { doc, setDoc, serverTimestamp, collection } from "firebase/firestore";

export const handleUploadImage = (file, userUid, setProgress, onCancel) => {
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

      const imageRef = ref(storage, `mediaStorage/${file.name}`);
      const uploadTask = uploadBytesResumable(imageRef, file);

      onCancel(() => {
        uploadTask.cancel();
        reject(new Error("Upload cancelled"));
      });

      setTimeout(() => {
        console.log("waiting for cancel... 1, 2, 3...");
      }, 4000);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
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

          resolve({ success: true, message: "Uploaded image successfully", url: downloadURL });
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
