import { createContext, useState, useEffect } from "react";
import { auth } from "../utils/firebase/index.firebase";

export const AuthContext = createContext({
  isAuthorized: false,
});

export const AuthProvider = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  // AuthState listener - listens for changes in auth (log in or out)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const value = { isAuthorized };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
