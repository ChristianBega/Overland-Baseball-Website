import React from "react";
import { useLocation } from "react-router-dom";
// MUI
import { Container, Typography } from "@mui/material";
// Components
import SignUpForm from "../component/SignUpForm";
import SignInForm from "../component/SignInForm";
import PasswordResetPage from "../../../pages/passwordReset/passwordReset.page";
import SectionLayout from "../../../components/reusableComponents/sectionLayout/sectionLayout.component";

const authPageContent = {
  "/authentication/sign-in": {
    heading: "Welcome Back",
    paragraph: "Sign in to your account below",
    form: <SignInForm />,
  },
  "/authentication/sign-up": {
    heading: "Welcome Blazers",
    paragraph: "Register for an account below",
    form: <SignUpForm />,
  },
  "/authentication/password-reset": {
    heading: "Reset Your Password",
    paragraph: "Enter your email to reset your password",
    form: <PasswordResetPage />,
  },
};

const AuthenticationPage = () => {
  const location = useLocation();
  const { heading, paragraph, form } = authPageContent[location.pathname] || {};

  return (
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
  );
};

export default AuthenticationPage;
