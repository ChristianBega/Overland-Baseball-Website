// src/features/auth/index.js

// Component exports
export { default as AlternativeAuthCta } from "./components/AlternativeAuthCta";
export { default as FormHeader } from "./components/FormHeader";
export { default as SignInForm } from "./components/SignInForm";
export { default as SignUpForm } from "./components/SignUpForm";

// Page exports
export { default as AuthPage } from "./pages/AuthPage";

// Context exports
export { AuthProvider, useAuth } from "./context/AuthContext";
export { UsersProvider } from "./context/UserContext";

// Utility exports
export {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  signInAuthWithEmailAndPassword,
  signOutUser,
  onAuthStateChangedListener,
} from "./utils/authUtils";

// Constants exports
export { ROLES, ROLE_HIERARCHY } from "./utils/roles";
