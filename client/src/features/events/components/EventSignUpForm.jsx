import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Box, Typography, Stack, Grid, TextField, Alert } from "@mui/material";
import formConfig from "../data/eventSignUp.config.json";
import { FormStatusIndicator, TextTruncate } from "../../../features/ui";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useTheme } from "@emotion/react";
import useMediaQueries from "../../../utils/helpers/useMediaQueries.utils";
import useFormSubmission from "../../../hooks/useFormSubmission";
import { processFormRules } from "../../../utils/helpers/processFormRules";
import { formatDateString } from "../../../utils/helpers/formatDate";
import { convertTo12HourFormat } from "../../../utils/helpers/convertToHourFormat";
const EventSignUpForm = ({ data, currentSeason, closeModal }) => {
  const { isSm } = useMediaQueries();
  const theme = useTheme();
  const currentSeasonData = data?.seasons?.[currentSeason?.toLowerCase()] || data;

  const {
    control,
    handleSubmit: handleFormSubmit,
    watch,
    reset,
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      playerName: "",
      playerPhone: "",
      guardianName: "",
      guardianEmail: "",
      guardianPhone: "",
    },
  });

  // Watch email field for rate limiting
  const emailValue = watch("guardianEmail");

  // Use form submission hook with all features
  const { handleSubmit, canSubmitForm, isLoading, error, response, showSuccessMessage, remainingAttempts, formattedTimeUntilReset, clearAllStatus } =
    useFormSubmission({
      apiBaseUrl: import.meta.env.REACT_APP_AWS_API_BASE_URL,
      requireAuth: true, // Event signups require authentication
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
      formType: "eventSignUp",
      formName: `${currentSeason || ""} ${data.title}`,
      formId: "evt-signup-001",
      source: "overlandbaseball.com",
      pageUrl: window.location.href,
      referrer: document.referrer,
      submittedAt: new Date().toISOString(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
    formData.location = currentSeasonData.location || data.location;
    formData.startDateTime = currentSeasonData.startDateTime;
    formData.endDateTime = currentSeasonData.endDateTime;

    // Submit with success callback
    const result = await handleSubmit(formData, () => {
      // Clear form on success
      reset();
      setTimeout(() => {
        closeModal();
      }, 3000);
    });

    if (result.success) {
      console.log("Event signup submitted successfully:", result.data);
    } else {
      console.error("Event signup submission failed:", result.error);
    }
  };

  // Clear status when component unmounts
  useEffect(() => {
    return () => {
      clearAllStatus();
    };
  }, [clearAllStatus]);

  // Updated helper component with improved styling
  const InfoItem = ({ icon, label, value }) => (
    <Stack
      title={`${value.props.text}`}
      direction="row"
      spacing={1}
      sx={{ paddingTop: "4px", paddingBottom: "4px" }}
      alignItems="center"
      justifyContent={{ xs: "", sm: "center", md: "flex-start" }}
    >
      <Box
        component="span"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 42,
          height: 42,
          borderRadius: "12px",
          backgroundColor: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(4px)",
          border: "1px solid rgba(255,255,255,0.1)",
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>
      <Stack direction="column" justifyContent="center">
        <Typography
          variant="caption"
          display="block"
          sx={{
            color: theme.palette.text.secondary4,
            fontSize: "0.7rem",
            fontWeight: 500,
            lineHeight: "0.7rem",
            marginBottom: "0.2rem",
          }}
        >
          {label}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,

            fontSize: { xs: "0.85rem", sm: "0.9rem", md: "1rem" },
          }}
        >
          {value}
        </Typography>
      </Stack>
    </Stack>
  );

  // Prepare the location value
  const locationValue = currentSeasonData.location || data.location;

  return (
    <Box component="form" onSubmit={handleFormSubmit(onSubmit)} sx={{ maxWidth: 800, mx: "auto" }}>
      <Stack
        direction="column"
        // alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{
          mb: 3,
          // background: "linear-gradient(168deg, #4cbb17 0%, #2b6411 100%)",
          background: "linear-gradient(-2deg, #4cbb17 0%, #317711 100%)",

          // background: "linear-gradient(135deg, #091f40 0%, #1a3a6a 100%)",
          color: "white",
          p: { xs: 2, sm: 3 },
          borderRadius: 1,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              color: "white",
              fontWeight: 600,
              fontSize: { xs: "1.25rem", sm: "1.5rem" },
              mb: 0,
            }}
          >
            {data.title}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", formHeader: "1fr 1fr", sm: "1fr 1fr 1fr" },
            gap: 1,
            "& > div": {
              borderRight: { xs: "none", sm: "1px solid rgba(255,255,255,0.15)" },
              "&:last-child": {
                borderRight: "none",
              },
              py: { xs: 1, md: 0 },
              pl: { md: 2 },
              "&:first-of-type": {
                pl: 0,
              },
            },
          }}
        >
          <InfoItem
            icon={<CalendarMonthIcon />}
            label="DATE"
            value={
              <TextTruncate text={formatDateString(currentSeasonData.startDateTime)} variant="body2" component="p" maxChars={20} showButton={false} />
            }
          />

          <InfoItem
            icon={<AccessTimeIcon />}
            label="TIME"
            value={
              <TextTruncate
                text={`${convertTo12HourFormat(currentSeasonData.startDateTime?.split("T")[1])} - ${convertTo12HourFormat(
                  currentSeasonData.endDateTime?.split("T")[1],
                )}`}
                variant="body2"
                component="p"
                maxChars={20}
                showButton={false}
              />
            }
          />

          {isSm && (
            <InfoItem
              icon={<LocationOnIcon />}
              label="LOCATION"
              value={<TextTruncate text={locationValue} variant="body2" component="p" maxChars={20} showButton={false} />}
            />
          )}
        </Box>
      </Stack>

      {/* Form Fields */}
      <Grid container spacing={2} mb={2}>
        {formConfig.map(({ name, label, placeholder, type, rules }, index) => (
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
            statusMessage={showSuccessMessage ? response?.data?.message || "Event signup submitted successfully!" : error}
            statusCode={response?.status}
            loading={isLoading}
            error={!!error}
          />
        </Box>
      )}

      {/* Submit Button */}
      <Button type="submit" variant="contained" color="secondary" fullWidth disabled={!canSubmitForm || isLoading} sx={{ mt: 3 }}>
        {isLoading ? "Submitting..." : "Submit"}
      </Button>
    </Box>
  );
};

export default EventSignUpForm;
