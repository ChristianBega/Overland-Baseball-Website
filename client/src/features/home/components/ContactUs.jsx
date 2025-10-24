import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
// Mui
import { Grid, Typography, Button, Alert, Box, TextField } from "@mui/material";
// Components
import SectionLayout from "../../ui/components/SectionLayout";
import { FormStatusIndicator } from "../../ui";
import SectionHeader from "../../ui/components/SectionHeader";
import TextBlock from "../../ui/components/TextBlock";
import SocialIcons from "../../ui/components/SocialIcons";
import { StyledForm } from "../../ui/components/StyledForm";
// Config
import contactUsConfig from "../data/contactUs.config.json";
// Hooks
import useFormSubmission from "../../../hooks/useFormSubmission";
import useMediaQueries from "../../../utils/helpers/useMediaQueries.utils";
// Theme
import { useTheme } from "@emotion/react";
import { processFormRules } from "../../../utils/helpers/processFormRules";

export default function ContactUs() {
  const theme = useTheme();
  const { isLg, isFormHeaderAndDown, isMd } = useMediaQueries();

  const {
    control,
    handleSubmit: handleFormSubmit,
    watch,
    reset,
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  // Watch email field for rate limiting
  const emailValue = watch("email");

  // Use form submission hook with all features
  const { handleSubmit, canSubmitForm, isLoading, error, response, showSuccessMessage, remainingAttempts, formattedTimeUntilReset, clearAllStatus } =
    useFormSubmission({
      apiBaseUrl: process.env.REACT_APP_AWS_API_BASE_URL_DEV,
      requireAuth: true, // Contact form requires authentication
      rateLimitIdentifier: emailValue, // Track by email
      maxAttempts: 3,
      successDisplayDuration: 4000, // Show success for 4 seconds
    });

  /**
   * Handle form submission
   */
  const onSubmit = async (formData) => {
    // Add form metadata
    formData.formMetaData = {
      formType: "contactUs",
      formName: "Contact Us",
      formId: "contact-us-001",
      source: "overlandbaseball.com",
      pageUrl: window.location.href,
      referrer: document.referrer,
      submittedAt: new Date().toISOString(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    // Submit with success callback
    const result = await handleSubmit(formData, () => {
      // Clear form on success
      reset();
    });

    if (result.success) {
      console.log("Form submitted successfully:", result.data);
    } else {
      console.error("Form submission failed:", result.error);
    }
  };

  // Clear status when component unmounts
  useEffect(() => {
    return () => {
      clearAllStatus();
    };
  }, [clearAllStatus]);

  return (
    <Grid item xs={12}>
      <SectionLayout id="contact-us-section" aria-label="Contact Us Section" marginBlock={true}>
        <Grid container id="contact-us-form-grid" columnSpacing={isLg ? 6 : 4} justifyContent="center" alignItems="center">
          {/* Left Column - Text Content */}
          <Grid item xs={12} md={6}>
            <TextBlock>
              <SectionHeader
                title="Contact Us"
                subtitle="Have A Question?"
                color={theme.palette.secondary.main}
                cta={!isMd && !isFormHeaderAndDown && <SocialIcons />}
                stackProps={{
                  direction: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              />
              <Typography typography="p" component="p">
                Whether you're a player interested in our baseball program, a parent or student looking to volunteer, or a business wanting to support
                our student-athletes – we want to hear from you. Contact us today to learn how to become part of the Trailblazer family.
              </Typography>
              {isMd && <SocialIcons />}
            </TextBlock>
          </Grid>

          {/* Right Column - Form */}
          <Grid item xs={12} md={6}>
            <StyledForm component="form" onSubmit={handleFormSubmit(onSubmit)}>
              {/* Form Fields */}
              <Grid container spacing={2} mb={2}>
                {contactUsConfig.map(({ name, label, placeholder, type, rules }, index) => (
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
                          multiline={type === "textarea"}
                          rows={type === "textarea" ? 4 : undefined}
                          value={field.value || ""}
                          error={!!error}
                          helperText={error?.message}
                          disabled={isLoading}
                        />
                      )}
                    />
                  </Grid>
                ))}
              </Grid>

              {/* Rate Limit Warning */}
              {canSubmitForm && remainingAttempts < 3 && (
                <Box mb={2}>
                  <Alert severity="info" sx={{ fontSize: "0.875rem" }}>
                    {remainingAttempts === 0
                      ? `Submission limit reached. Try again in ${formattedTimeUntilReset}.`
                      : `${remainingAttempts} submission${remainingAttempts === 1 ? "" : "s"} remaining this hour.`}
                  </Alert>
                </Box>
              )}

              {/* Status Messages */}
              {(isLoading || error || showSuccessMessage) && (
                <Box mb={2}>
                  <FormStatusIndicator
                    statusMessage={showSuccessMessage ? response?.data?.message || "Email sent successfully!" : error}
                    statusCode={response?.status}
                    loading={isLoading}
                    error={!!error}
                  />
                </Box>
              )}

              {/* Submit Button */}
              <Button type="submit" variant="contained" color="secondary" fullWidth disabled={!canSubmitForm || isLoading}>
                {isLoading ? "Sending..." : "Send Your Message"}
              </Button>
            </StyledForm>
          </Grid>
        </Grid>
      </SectionLayout>
    </Grid>
  );
}
