// import React, { useState } from "react";
// import { Link as RouterLink, useNavigate } from "react-router-dom";
// // Components
// import AlternativeAuthCta from "./AlternativeAuthCta";
// // MUI
// import { Button, Typography, Link as MuiLink, Grid, Alert } from "@mui/material";
// // React Hook Form
// import { Controller, useForm } from "react-hook-form";
// // Config
// import signInInputFields from "../data/signInInputFields.config.json";
// // Utils & Hooks
// import { signInAuthWithEmailAndPassword } from "../utils/authUtils";
// import { StyledForm } from "../../../utils/theme/index.styles";
// import InputFieldComponent from "../../../features/ui/components/InputFields";

// const SignInForm = () => {
//   const navigate = useNavigate();
//   const [errorMessage, setErrorMessage] = useState("");

//   const {
//     control,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const handleSignUpForm = async (data) => {
//     const { email, password } = data;
//     setErrorMessage(""); // Clear previous errors

//     try {
//       await signInAuthWithEmailAndPassword(email, password);
//       reset();
//       navigate("/");
//     } catch (error) {
//       switch (error.code) {
//         case "auth/wrong-password":
//           setErrorMessage("Incorrect password. Please try again.");
//           break;
//         case "auth/user-not-found":
//           setErrorMessage("No account found with this email.");
//           break;
//         case "auth/invalid-login-credentials":
//           setErrorMessage("Invalid email or password. Please try again.");
//           break;
//         case "auth/invalid-email":
//           setErrorMessage("Please enter a valid email address.");
//           break;
//         default:
//           setErrorMessage("An error occurred. Please try again.");
//           console.error("Sign-in error:", error);
//       }
//     }
//   };

//   return (
//     <StyledForm onSubmit={handleSubmit(handleSignUpForm)} id="sign-in-form" aria-label="Sign In Form">
//       {/* Error Message Display */}
//       {errorMessage && (
//         <Alert severity="error" sx={{ mb: 2 }}>
//           {errorMessage}
//         </Alert>
//       )}

//       {/* Email/Password Form Fields */}
//       <Grid container direction="column" spacing={2} mb={4}>
//         {signInInputFields.map((config, index) => (
//           <Grid key={index + config.name} item xs={12}>
//             <Controller
//               required
//               name={config.name}
//               control={control}
//               rules={config.rules}
//               render={({ field }) => (
//                 <InputFieldComponent
//                   id={config.name}
//                   placeHolder={config.placeholder}
//                   type={config.type}
//                   label={config.label}
//                   fullWidth
//                   value={field.value}
//                   onChange={field.onChange}
//                   error={errors[config.name]}
//                   helperText={errors.player_name?.message}
//                   {...field}
//                 />
//               )}
//             />
//           </Grid>
//         ))}
//       </Grid>

//       {/* Forgot Password Link */}
//       <MuiLink variant="highlighted" component={RouterLink} to={"/authentication/password-reset"} aria-label="Forgot Password Link">
//         Forgot your password?
//       </MuiLink>

//       {/* Sign In Button */}
//       <Button id="sign-in-form" type="submit" variant="contained" color="secondary" aria-label="Sign In Button" fullWidth sx={{ mt: 2 }}>
//         Sign In
//       </Button>

//       {/* Alternative Auth CTA */}
//       <AlternativeAuthCta />

//       {/* Sign Up Link */}
//       <Typography component="span" variant="span" textAlign="center">
//         Don't have an account?{" "}
//         <MuiLink variant="highlighted" component={RouterLink} to={"/authentication/sign-up"} aria-label="Create Account Link">
//           Register Now
//         </MuiLink>
//       </Typography>
//     </StyledForm>
//   );
// };

// export default SignInForm;
import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// React Hook Form
import { Controller, useForm } from "react-hook-form";
// MUI
import { Button, Typography, Link as MuiLink, Grid, TextField, Box, Alert, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
// Components
import AlternativeAuthCta from "./AlternativeAuthCta";
import { FormStatusIndicator } from "../../ui";
// Styles
import { StyledForm } from "../../ui/components/StyledForm";
// Utils & Hooks
import { signInAuthWithEmailAndPassword } from "../utils/authUtils";
import { processFormRules } from "../../../utils/helpers/processFormRules";
import useLocalRateLimiting from "../../../hooks/useLocalRateLimiting";
// Config
import signInInputFields from "../data/signInInputFields.config.json";

const SignInForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit: handleFormSubmit,
    watch,
    reset,
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Watch email for rate limiting
  const emailValue = watch("email");

  // Rate limiting hook (5 attempts per hour)
  const { canSubmit, remainingAttempts, formattedTimeUntilReset, recordAttempt } = useLocalRateLimiting(emailValue, 5);

  /**
   * Handle sign in form submission
   */
  const onSubmit = async (data) => {
    const { email, password } = data;

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
      // Sign in with Firebase
      await signInAuthWithEmailAndPassword(email, password);

      // Record attempt for rate limiting
      recordAttempt();

      // Show success message
      setSuccessMessage("Sign in successful! Redirecting...");

      // Clear form
      reset();

      // Navigate to home after brief delay
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      // Record failed attempt for rate limiting
      recordAttempt();

      // Handle Firebase errors
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
        case "auth/too-many-requests":
          setErrorMessage("Too many failed login attempts. Please try again later.");
          break;
        default:
          setErrorMessage("An error occurred. Please try again.");
          console.error("Sign-in error:", error);
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
    <StyledForm component="form" onSubmit={handleFormSubmit(onSubmit)} id="sign-in-form" aria-label="Sign In Form">
      {/* Form Fields */}
      <Grid container direction="column" spacing={2} mb={2}>
        {signInInputFields.map(({ name, label, placeholder, type, rules }, index) => (
          <Grid key={index + name} item xs={12}>
            <Controller
              name={name}
              control={control}
              rules={processFormRules(rules)}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  type={name === "password" ? (showPassword ? "text" : "password") : type}
                  label={label}
                  placeholder={placeholder}
                  variant="outlined"
                  fullWidth
                  value={field.value || ""}
                  error={!!error}
                  helperText={error?.message}
                  disabled={isLoading}
                  InputProps={
                    name === "password"
                      ? {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword(!showPassword)} edge="end">
                                {showPassword ? <Visibility /> : <VisibilityOff />}
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

      {/* Forgot Password Link */}
      <Box mb={2}>
        <MuiLink variant="highlighted" component={RouterLink} to={"/authentication/password-reset"} aria-label="Forgot Password Link">
          Forgot your password?
        </MuiLink>
      </Box>

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

      {/* Sign In Button */}
      <Button type="submit" variant="contained" color="secondary" fullWidth disabled={!canSubmit || isLoading} sx={{ mt: 2, mb: 4 }}>
        {isLoading ? "Signing In..." : "Sign In"}
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
