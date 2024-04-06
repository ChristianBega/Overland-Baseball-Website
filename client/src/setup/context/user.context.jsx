import { createContext, useState, useEffect, useContext } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/firebase/authentication";
import { auth } from "../utils/firebase/index.firebase";
import { AuthContext } from "./authentication.context";
import { getCurrentUserProfile } from "../utils/firebase/users.firebase";

export const UserContext = createContext({
  currentUserObject: {},
  currentUserProfile: {},
  setCurrentUserObject: () => null,
});

export const UserProvider = ({ children }) => {
  const { isAuthorized } = useContext(AuthContext);
  const [currentUserObject, setCurrentUserObject] = useState(null);
  const [currentUserProfile, setCurrentUserProfile] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUserObject(user);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const getCurrentUserProfileData = async () => {
      if (isAuthorized && auth.currentUser.uid) {
        const userProfile = await getCurrentUserProfile(auth.currentUser.uid, setCurrentUserProfile);
        setCurrentUserProfile(userProfile);
      }
    };
    getCurrentUserProfileData();
  }, [isAuthorized]);

  const value = {
    currentUserProfile,
    currentUserObject,
    setCurrentUserObject,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
