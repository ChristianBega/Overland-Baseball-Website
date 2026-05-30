import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// React Hook Form
import { Controller, useForm } from "react-hook-form";
// MUI
import { Button, Typography, Link as MuiLink, Grid, TextField, Box, Alert, InputAdornment, IconButton } from "@mui/material";
// Components
import AlternativeAuthCta from "./AlternativeAuthCta";
import { FormStatusIndicator } from "../../ui";
// Styles
import { StyledForm } from "../../ui/components/StyledForm";
// Utils & Hooks
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../utils/authUtils";
import { processFormRules } from "../../../utils/helpers/processFormRules";
import useLocalRateLimiting from "../../../hooks/useLocalRateLimiting";
// Config
import signUpInputFields from "../data/signUpInputFields.config.json";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit: handleFormSubmit,
    watch,
    reset,
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Watch email and password for rate limiting and validation
  const emailValue = watch("email");
  const passwordValue = watch("password");

  // Rate limiting hook (5 attempts per hour)
  const { canSubmit, remainingAttempts, formattedTimeUntilReset, recordAttempt } = useLocalRateLimiting(emailValue, 5);

  /**
   * Handle sign up form submission
   */
  const onSubmit = async (data) => {
    const { userName, email, password } = data;

    // Clear previous messages
    setErrorMessage("");
    setSuccessMessage("");

    // Check rate limit
    if (!canSubmit) {
      setErrorMessage(`You've reached the submission limit. Please try again in ${formattedTimeUntilReset}.`);
      return;
    }

    setIsLoading(true);

    try {
      // Create Firebase user
      const { user } = await createAuthUserWithEmailAndPassword(email, password);

      // Create user document in Firestore
      await createUserDocumentFromAuth(user, { userName });

      // Record attempt for rate limiting
      recordAttempt();

      // Show success message
      setSuccessMessage("Account created successfully! Redirecting...");

      // Clear form
      reset();

      // Navigate to home after brief delay
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      // Record failed attempt for rate limiting
      recordAttempt();

      // Handle Firebase errors
      switch (error.code) {
        case "auth/email-already-in-use":
          setErrorMessage("An account with this email already exists.");
          break;
        case "auth/invalid-email":
          setErrorMessage("Please enter a valid email address.");
          break;
        case "auth/weak-password":
          setErrorMessage("Password is too weak. Please use a stronger password.");
          break;
        case "auth/operation-not-allowed":
          setErrorMessage("Email/password accounts are not enabled. Please contact support.");
          break;
        default:
          setErrorMessage("An error occurred during sign up. Please try again.");
          console.error("Sign-up error:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Clear messages on unmount
  useEffect(() => {
    return () => {
      setErrorMessage("");
      setSuccessMessage("");
    };
  }, []);

  return (
    <StyledForm component="form" onSubmit={handleFormSubmit(onSubmit)} id="sign-up-form" aria-label="Sign Up Form">
      {/* Form Fields */}
      <Grid container direction="column" spacing={2} mb={2}>
        {signUpInputFields.map(({ name, label, placeholder, type, rules }, index) => (
          <Grid key={index + name} item xs={12}>
            <Controller
              name={name}
              control={control}
              rules={{
                ...processFormRules(rules),
                ...(name === "confirmPassword" && {
                  validate: (value) => value === passwordValue || "Passwords do not match",
                }),
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  type={
                    name === "password"
                      ? showPassword
                        ? "text"
                        : "password"
                      : name === "confirmPassword"
                      ? showConfirmPassword
                        ? "text"
                        : "password"
                      : type
                  }
                  label={label}
                  placeholder={placeholder}
                  variant="outlined"
                  fullWidth
                  value={field.value || ""}
                  error={!!error}
                  helperText={error?.message}
                  disabled={isLoading}
                  InputProps={
                    name === "password" || name === "confirmPassword"
                      ? {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label={`toggle ${name} visibility`}
                                onClick={() => {
                                  if (name === "password") {
                                    setShowPassword(!showPassword);
                                  } else {
                                    setShowConfirmPassword(!showConfirmPassword);
                                  }
                                }}
                                edge="end"
                              >
                                {(name === "password" ? showPassword : showConfirmPassword) ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }
                      : undefined
                  }
                />
              )}
            />
          </Grid>
        ))}
      </Grid>

      {/* Rate Limit Warning */}
      {canSubmit && remainingAttempts < 5 && (
        <Box mb={2}>
          <Alert severity="info" sx={{ fontSize: "0.875rem" }}>
            {remainingAttempts === 0
              ? `Submission limit reached. Try again in ${formattedTimeUntilReset}.`
              : `${remainingAttempts} attempt${remainingAttempts === 1 ? "" : "s"} remaining this hour.`}
          </Alert>
        </Box>
      )}

      {/* Status Messages */}
      {(isLoading || errorMessage || successMessage) && (
        <Box mb={2}>
          <FormStatusIndicator success={!!successMessage} statusMessage={successMessage || errorMessage} loading={isLoading} error={!!errorMessage} />
        </Box>
      )}

      {/* Sign Up Button */}
      <Button type="submit" variant="contained" color="secondary" fullWidth disabled={!canSubmit || isLoading} sx={{ mt: 2, mb: 4 }}>
        {isLoading ? "Creating Account..." : "Sign Up"}
      </Button>

      {/* Alternative Auth CTA */}
      <AlternativeAuthCta />

      {/* Sign In Link */}
      <Typography component="span" variant="span" textAlign="center">
        Already have an account?{" "}
        <MuiLink variant="highlighted" component={RouterLink} to={"/authentication/sign-in"} aria-label="Sign In Link">
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
