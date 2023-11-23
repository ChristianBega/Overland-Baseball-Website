import { createContext, useState, useEffect } from "react";
// import { auth } from "../setup/utils/firebase/index.firebase";
import { auth } from "../utils/firebase/index.firebase";

// Creating UserContext which represents the actual value you want to access === CONTEXT
export const AuthContext = createContext({
  isAuthorized: false,
});

export const AuthProvider = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Set up the listener when the component mounts
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const value = { isAuthorized };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
