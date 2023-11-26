import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import signInInputFields from "./signInInputFields.config.json";
import { signInAuthWithEmailAndPassword } from "../../../../../setup/utils/firebase/authentication";
import { Link, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import FormHeader from "../formHeader/formHeader.component";

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

const SignInForm = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleSignUpForm = async (data) => {
    const { email, password } = data;
    try {
      await signInAuthWithEmailAndPassword(email, password);
      reset();
      navigate("/");
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Incorrect Password!");
          break;
        case "auth/user-not-found":
          alert("Sorry, no user found!");
          break;
        case "auth/invalid-login-credentials":
          alert("Please recheck your email/password!");
          break;
        default:
          alert(error);
      }
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit(handleSignUpForm)} id="sign-in-form">
      <FormHeader formHeaderContent={"Sign In Form"} />
      {signInInputFields.map((config, index) => (
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
      <Link to={"/authentication/password-reset"}>Forgot your password?</Link>
      {/* <Stack>
        <Button id="sign-up-form" type="submit">
          Sign In With Google
        </Button>
      </Stack> */}
      <Button id="sign-in-form" type="submit">
        Sign In
      </Button>
      <Typography component="span">
        Don't have an account? <Link to={"/authentication/sign-up"}>Create Account</Link>
      </Typography>
    </StyledForm>
  );
};

export default SignInForm;
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
