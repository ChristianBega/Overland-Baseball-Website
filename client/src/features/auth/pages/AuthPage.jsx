import React from "react";
import { useLocation } from "react-router-dom";
// MUI
import { Container, Typography } from "@mui/material";
// Components
import SignUpForm from "../components/SignUpForm";
import SignInForm from "../components/SignInForm";
// import PasswordResetPage from "../../../pages/passwordReset/passwordReset.page";
import PasswordResetPage from "../pages/PasswordResetPage";
import SectionLayout from "../../../features/ui/components/SectionLayout";
import { Navigation } from "../../navigation";
import useDocumentTitle from "../../../hooks/useDocumentTitle";

const authPageContent = {
  "/authentication/sign-in": {
    title: "Sign In | Overland Baseball",
    heading: "Welcome Back",
    paragraph: "Sign in to your account below",
    form: <SignInForm />,
  },
  "/authentication/sign-up": {
    title: "Sign Up | Overland Baseball",
    heading: "Welcome Blazers",
    paragraph: "Register for an account below",
    form: <SignUpForm />,
  },
  "/authentication/password-reset": {
    title: "Reset Password | Overland Baseball",
    heading: "Reset Your Password",
    paragraph: "Enter your email to reset your password",
    form: <PasswordResetPage />,
  },
};

const AuthenticationPage = () => {
  const location = useLocation();
  const { title, heading, paragraph, form } = authPageContent[location.pathname] || {};
  useDocumentTitle(title || "Overland Baseball");

  return (
    <>
      <Navigation />
      <Container component="main" id="authentication-page" aria-label="Authentication Page">
        <SectionLayout
          id={`${location.pathname.split("/").pop()}-form`}
          aria-label={`${heading} Form`}
          marginBlock={true}
          sx={{ maxWidth: "600px", marginInline: "auto" }}
        >
          <Typography variant="h2" component="h2">
            {heading}
          </Typography>
          <Typography variant="p" component="p">
            {paragraph}
          </Typography>
          {form}
        </SectionLayout>
      </Container>
    </>
  );
};

export default AuthenticationPage;
