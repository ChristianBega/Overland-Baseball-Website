import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
// React Hook Form
import { Controller, useForm } from "react-hook-form";
// MUI
import { Button, Typography, Link as MuiLink, Grid, TextField, Box, Alert } from "@mui/material";
// Components
import { FormStatusIndicator } from "../../ui";
// Styles
import { StyledForm } from "../../ui/components/StyledForm";
// Utils & Hooks
import { sendPasswordResetEmailFirebase } from "../utils/authUtils";
import { processFormRules } from "../../../utils/helpers/processFormRules";
import useLocalRateLimiting from "../../../hooks/useLocalRateLimiting";
// Config
import forgotPasswordConfig from "../data/forgotPasswordFields.config.json";

const ForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    control,
    handleSubmit: handleFormSubmit,
    watch,
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  // Watch email for display in success message
  const emailValue = watch("email");

  // Rate limiting hook (3 attempts per hour, tracked by action type not email)
  const { canSubmit, remainingAttempts, formattedTimeUntilReset, recordAttempt } = useLocalRateLimiting("passwordReset", 3);

  /**
   * Handle password reset form submission
   */
  const onSubmit = async (data) => {
    const { email } = data;

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
      // Send password reset email via Firebase
      await sendPasswordResetEmailFirebase(email);

      // Record attempt for rate limiting
      recordAttempt();

      // Show success state
      setEmailSent(true);
    } catch (error) {
      // Record failed attempt for rate limiting
      recordAttempt();

      // Handle Firebase errors
      let errorMsg = "Failed to send reset email. Please try again.";

      switch (error.code) {
        case "auth/user-not-found":
          errorMsg = "No account found with this email address.";
          break;
        case "auth/invalid-email":
          errorMsg = "Please enter a valid email address.";
          break;
        case "auth/too-many-requests":
          errorMsg = "Too many requests. Please try again later.";
          break;
        default:
          console.error("Password reset error:", error);
      }

      setErrorMessage(errorMsg);
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

  // If email was sent successfully, show success state
  if (emailSent) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Alert severity="success" sx={{ mb: 3 }}>
          Password reset email sent!
        </Alert>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Please check your email at <strong>{emailValue}</strong> for instructions to reset your password.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Didn't receive the email? Check your spam folder or try again in an hour.
        </Typography>
        <MuiLink variant="highlighted" component={RouterLink} to="/authentication/sign-in" aria-label="Back to Sign In Link">
          Back to Sign In
        </MuiLink>
      </Box>
    );
  }

  return (
    <StyledForm component="form" onSubmit={handleFormSubmit(onSubmit)} id="forgot-password-form" aria-label="Forgot Password Form">
      {/* Form Fields */}
      <Grid container direction="column" spacing={2} mb={2}>
        {forgotPasswordConfig.map(({ name, label, placeholder, type, rules }, index) => (
          <Grid key={index + name} item xs={12}>
            <Controller
              name={name}
              control={control}
              rules={processFormRules(rules)}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  type={type}
                  label={label}
                  placeholder={placeholder}
                  variant="outlined"
                  fullWidth
                  value={field.value || ""}
                  error={!!error}
                  helperText={error?.message}
                  disabled={isLoading || !canSubmit}
                />
              )}
            />
          </Grid>
        ))}
      </Grid>

      {/* Rate Limit Warning */}
      {canSubmit && remainingAttempts < 3 && (
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

      {/* Submit Button */}
      <Button type="submit" variant="contained" color="secondary" fullWidth disabled={!canSubmit || isLoading} sx={{ mt: 2, mb: 4 }}>
        {isLoading ? "Sending..." : "Send Reset Email"}
      </Button>

      {/* Back to Sign In Link */}
      <Typography component="span" variant="span" textAlign="center">
        Remember your password?{" "}
        <MuiLink variant="highlighted" component={RouterLink} to="/authentication/sign-in" aria-label="Back to Sign In Link">
          Back to Sign In
        </MuiLink>
      </Typography>
    </StyledForm>
  );
};

export default ForgotPasswordForm;
