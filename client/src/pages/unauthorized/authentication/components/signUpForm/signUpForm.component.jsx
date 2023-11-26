import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import signUpInputFields from "./signUpInputFields.config.json";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../../../../setup/utils/firebase/authentication";
import { Link, useNavigate } from "react-router-dom";
import FormHeader from "../formHeader/formHeader.component";
import styled from "@emotion/styled";
const StyledForm = styled("form")(({ theme }) => ({
  minHeight: "800px",
  maxWidth: "600px",
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "1rem",
  padding: "1rem",
}));
const SignUpForm = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const handleSignUpForm = async (data) => {
    const { userName, email, password, confirmPassword } = data;
    if (!userName || !email || !password || !confirmPassword) {
      console.error("All fields are required");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(user, { userName });
      reset();
      navigate("/");
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Incorrect Password");
          break;
        case "auth/user-not-found":
          alert("No user found!");
          break;
        case "auth/invalid-email":
          alert("Invalid Email");
          break;
        case "auth/invalid-login-credentials":
          alert("Invalid Login In Credentials");
          break;
        default:
          console.log(error);
      }
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit(handleSignUpForm)} id="sign-up-form">
      <FormHeader formHeaderContent={"Sign Up Form"} />

      {signUpInputFields.map((config, index) => (
        <Controller
          required
          key={index + config.name}
          name={config.name}
          control={control}
          rules={config.rules}
          render={({ field }) => (
            <TextField
              id={config.name}
              placeHolder={config.placeholder}
              type={config.type}
              label={config.label}
              error={errors[config.name]}
              variant="outlined"
              helperText={errors.player_name?.message}
              {...field}
            />
          )}
        />
      ))}
      {/* <Link to={"/authentication/password-reset"}>Forgot your password?</Link> */}
      <Button id="sign-up-form" type="submit">
        Sign Up
      </Button>
      <Typography component="span">
        Already have an account? <Link to={"/authentication/sign-in"}>Sign In</Link>
      </Typography>
    </StyledForm>
  );
};

export default SignUpForm;
// {
//   "name": "password",
//   "label": "Blazer Number",
//   "placeholder": "Enter blazer number here...",
//   "type": "password",
//   "rules": {
//     "required": "Blazer Number is required *",
//     "pattern": {
//       "value": "^(?=.*\\d).{8,}$",
//       "message": "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character (@#$%^&+=!)"
//     }
//   }
// },
