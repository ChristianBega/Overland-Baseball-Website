import React from "react";
import SignUpForm from "./components/signUpForm/signUpForm.component";
import SignInForm from "./components/signInForm/signInForm.component";
import { useLocation } from "react-router-dom";

const AuthenticationPage = () => {
  const location = useLocation();
  return (
    <div>
      {location.pathname === "/authentication/sign-in" && <SignInForm />}
      {location.pathname === "/authentication/sign-up" && <SignUpForm />}
      {/* {location.pathname === "/authentication/password-reset" && <PasswordResetPage />} */}
    </div>
  );
};

export default AuthenticationPage;
