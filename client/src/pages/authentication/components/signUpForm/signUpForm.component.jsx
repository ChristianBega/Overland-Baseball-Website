import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// React Hook Form
import { Controller, useForm } from "react-hook-form";
// Components
import AlternativeAuthCta from "../alternativeAuthCta/alternativeAuthCta";
// MUI
import { Button, Stack, TextField, Typography, Link as MuiLink } from "@mui/material";
// Styles
import { StyledForm } from "../../../../styles/index.styles";
// Utils & Hooks
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../../../setup/utils/firebase/authentication";
// Config
import signUpInputFields from "./signUpInputFields.config.json";

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
      {/* <FormHeader formHeaderContent={"Sign Up Form"} /> */}
      <Stack direction="column" spacing={2} id="input-field-container" my={2}>
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
      </Stack>
      <Button variant="contained" color="secondary" id="sign-up-form" aria-label="Sign Up Form" type="submit" sx={{ mt: 2, mb: 4 }}>
        Sign Up
      </Button>
      <AlternativeAuthCta />
      <Typography component="span" textAlign="center">
        Already have an account?{" "}
        <MuiLink variant="highlighted" component={RouterLink} to={"/authentication/sign-in"}>
          Sign In
        </MuiLink>
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
