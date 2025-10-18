// ! FIREBASE is deprecating.... will update soon....
import { createContext, useState, useEffect, useContext } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/authUtils";
// import { auth } from "../utils/firebase/index.firebase";
import { AuthContext } from "./AuthContext";
import { getCurrentUserProfile } from "../utils/users";

export const UserContext = createContext({
  currentUserObject: {},
  currentUserProfile: {},
  setCurrentUserObject: () => null,
});

export const UserProvider = ({ children }) => {
  const { isAuthorized } = useContext(AuthContext);
  const [currentUserObject, setCurrentUserObject] = useState(null);
  const [currentUserProfile, setCurrentUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        await createUserDocumentFromAuth(user);
        setCurrentUserObject(user);

        if (user.uid) {
          try {
            const userProfile = await getCurrentUserProfile(user.uid);
            setCurrentUserProfile(userProfile);
          } catch (error) {
            console.error("Error fetching user profile:", error);
          }
        }
      } else {
        setCurrentUserObject(null);
        setCurrentUserProfile(null);
      }
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUserProfile,
    currentUserObject,
    setCurrentUserObject,
    isLoading,
  };

  if (isLoading) {
    return null; // or return a loading spinner
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
