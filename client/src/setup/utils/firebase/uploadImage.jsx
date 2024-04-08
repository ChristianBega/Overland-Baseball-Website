// ! STUCK MOVING ON FOR NOW
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { doc, setDoc } from "firebase/firestore";
// import { auth, db } from "./index.firebase";

// // Initialize Firebase Storage
// const storage = getStorage();

// // Initialize Firestore

// /**
//  * Uploads an image to Firebase Storage and creates/updates a Firestore document with the image's metadata.
//  * @param {File} file - The image file to upload.
//  * @param {string} path - The storage path where the image will be saved.
//  * @param {Object} metadata - Metadata for the upload, including contentType.
//  * @param {Object} docData - The data to be saved in Firestore, including the associated date.
//  */
// export async function uploadImageAndSaveMetadata(file, path, metadata, docData) {
//   // Reference to the storage location
//   const storageRef = ref(storage, path + file.name);

//   // Start the file upload
//   const uploadTask = uploadBytesResumable(storageRef, file, metadata);

//   // Listen for state changes, errors, and completion of the upload
//   uploadTask.on(
//     "state_changed",
//     (snapshot) => {
//       // Optionally handle progress, pause, resume
//       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//       console.log(`Upload is ${progress}% done`);
//     },
//     (error) => {
//       // Handle any errors
//       console.error("Upload error:", error);
//     },
//     () => {
//       // Upload completed successfully, now get the download URL
//       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//         console.log("File available at", downloadURL);

//         // Here you add the downloadURL to your docData
//         docData.imageUrl = downloadURL;

//         // Now save docData to Firestore. Adjust `yourCollectionName` and `documentId` as needed
//         const docRef = doc(db, "teamLogos", docData.date); // Example: using date as document ID
//         setDoc(docRef, docData)
//           .then(() => console.log("Document successfully written!"))
//           .catch((error) => console.error("Error writing document: ", error));
//       });
//     }
//   );
// }

// const images = [
//   { name: "Vista Peak", path: "teamLogos/vistaPeak.webp" },
//   { name: "Aurora Central", path: "teamLogos/auroraCentral.webp" },
//   { name: "Eagle Crest", path: "teamLogos/eagleCrest.webp" },
//   { name: "GateWay", path: "teamLogos/gateWay.webp" },
//   { name: "Highlands Ranch", path: "teamLogos/highlandsRanch.webp" },
//   { name: "Mountain Range", path: "teamLogos/mountainRange.webp" },
//   { name: "Mullen", path: "teamLogos/mullen.webp" },
//   { name: "Standley Lake", path: "teamLogos/standleyLake.webp" },
//   { name: "Thornton", path: "teamLogos/thornton.webp" },
//   { name: "Westminster", path: "teamLogos/westminster.webp" },
//   { name: "Vista Ridge", path: "teamLogos/vistaRidge.webp" },
//   { name: "Cherry Creek", path: "teamLogos/cherryCreek.webp" },
//   { name: "Grand View", path: "teamLogos/grandView.webp" },
//   { name: "Smoky Hill", path: "teamLogos/smokyHill.webp" },
//   { name: "Cherokee Trail", path: "teamLogos/cherokeeTrail.webp" },
//   { name: "Arapahoe", path: "teamLogos/arapahoe.webp" },
//   { name: "Range View", path: "teamLogos/rangeView.webp" },
// ];
// // move later
// const handleUploadImage = () => {
//   images.forEach(async (image) => {
//     const response = await fetch(`./../../../assets/homePage/${image.path}`);
//     console.log(response);
//     const blob = await response.blob();
//     console.log(blob);

//     // Use the blob here to upload as previously described
//     const metadata = {
//       contentType: "image/webp",
//     };

//     const docData = {
//       date: new Date().toISOString(), // Example date
//       description: `${image.name} Logo`,
//     };

//     // Construct a unique path for Firebase Storage
//     const uploadPath = `teamLogos/${image.name.replace(/\s+/g, "_").toLowerCase()}.webp`;

//     // Assuming `uploadImageAndSaveMetadata` is adapted to work with Blob objects
//     uploadImageAndSaveMetadata(blob, uploadPath, metadata, docData);
//   });
// };
