import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase/index.firebase";

/**
 * Custom hook to check if user is authenticated
 * @param {boolean} requireAuth - Whether authentication is required for this form
 * @returns {object} - { user, loading, isAuthenticated, authError }
 */
const useAuthenticatedForm = (requireAuth = false) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setLoading(false);

        // If auth is required but user is not logged in, set error
        if (requireAuth && !currentUser) {
          setAuthError("You must be logged in to use this form.");
        } else {
          setAuthError(null);
        }
      },
      (error) => {
        console.error("Auth state change error:", error);
        setLoading(false);
        if (requireAuth) {
          setAuthError("Authentication error. Please try refreshing the page.");
        }
      }
    );

    return () => unsubscribe();
  }, [requireAuth]);

  return {
    user,
    loading,
    isAuthenticated: !!user,
    authError,
  };
};

export default useAuthenticatedForm;
