import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Import firebase firestore
import { getFirestore } from "firebase/firestore";
// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initializing firebase instance
const firebaseApp = initializeApp(firebaseConfig);

// Creating authentication and Firestore instances
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { firebaseApp, auth, db };
