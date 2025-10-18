import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// Components
import AlternativeAuthCta from "./AlternativeAuthCta";
// MUI
import { Button, Typography, Link as MuiLink, Grid, Alert } from "@mui/material";
// React Hook Form
import { Controller, useForm } from "react-hook-form";
// Config
import signInInputFields from "../data/signInInputFields.config.json";
// Utils & Hooks
import { signInAuthWithEmailAndPassword } from "../utils/authUtils";
import { StyledForm } from "../../../utils/theme/index.styles";
import InputFieldComponent from "../../../features/ui/components/InputFields";

const SignInForm = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleSignUpForm = async (data) => {
    const { email, password } = data;
    setErrorMessage(""); // Clear previous errors

    try {
      await signInAuthWithEmailAndPassword(email, password);
      reset();
      navigate("/");
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          setErrorMessage("Incorrect password. Please try again.");
          break;
        case "auth/user-not-found":
          setErrorMessage("No account found with this email.");
          break;
        case "auth/invalid-login-credentials":
          setErrorMessage("Invalid email or password. Please try again.");
          break;
        case "auth/invalid-email":
          setErrorMessage("Please enter a valid email address.");
          break;
        default:
          setErrorMessage("An error occurred. Please try again.");
          console.error("Sign-in error:", error);
      }
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit(handleSignUpForm)} id="sign-in-form" aria-label="Sign In Form">
      {/* Error Message Display */}
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}

      {/* Email/Password Form Fields */}
      <Grid container direction="column" spacing={2} mb={4}>
        {signInInputFields.map((config, index) => (
          <Grid key={index + config.name} item xs={12}>
            <Controller
              required
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
                  helperText={errors.player_name?.message}
                  {...field}
                />
              )}
            />
          </Grid>
        ))}
      </Grid>

      {/* Forgot Password Link */}
      <MuiLink variant="highlighted" component={RouterLink} to={"/authentication/password-reset"} aria-label="Forgot Password Link">
        Forgot your password?
      </MuiLink>

      {/* Sign In Button */}
      <Button id="sign-in-form" type="submit" variant="contained" color="secondary" aria-label="Sign In Button" fullWidth sx={{ mt: 2 }}>
        Sign In
      </Button>

      {/* Alternative Auth CTA */}
      <AlternativeAuthCta />

      {/* Sign Up Link */}
      <Typography component="span" variant="span" textAlign="center">
        Don't have an account?{" "}
        <MuiLink variant="highlighted" component={RouterLink} to={"/authentication/sign-up"} aria-label="Create Account Link">
          Register Now
        </MuiLink>
      </Typography>
    </StyledForm>
  );
};

export default SignInForm;
