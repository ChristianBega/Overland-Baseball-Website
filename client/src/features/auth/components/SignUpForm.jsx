import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// React Hook Form
import { Controller, useForm } from "react-hook-form";
// Components
import AlternativeAuthCta from "./AlternativeAuthCta";
// MUI
import { Button, Typography, Link as MuiLink, Grid } from "@mui/material";
// Styles
import { StyledForm } from "../../../utils/theme/index.styles";
// Utils & Hooks
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../utils/authUtils";
// Config
import signUpInputFields from "../data/signUpInputFields.config.json";
import InputFieldComponent from "../../../features/ui/components/InputFields";

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
      <Grid container direction="column" spacing={2} mb={4}>
        {signUpInputFields.map((config, index) => (
          <Grid key={index + config.name} item xs={12}>
            <Controller
              required
              key={index + config.name}
              name={config.name}
              control={control}
              rules={config.rules}
              render={({ field }) => (
                <InputFieldComponent
                  id={config.name}
                  placeHolder={config.placeholder}
                  type={config.type}
                  label={config.label}
                  fullWidth
                  value={field.value}
                  onChange={field.onChange}
                  error={errors[config.name]}
                  // variant="outlined"
                  helperText={errors.player_name?.message}
                  {...field}
                />
              )}
            />
          </Grid>
        ))}
      </Grid>
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
