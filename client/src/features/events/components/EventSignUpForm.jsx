import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Box, Typography, Stack, Grid } from "@mui/material";
import formConfig from "../data/eventSignUp.config.json";
import InputFieldComponent from "../../../features/ui/components/InputFields";
import useEmailService from "../../../hooks/useEmailServices";
import { FormStatusIndicator } from "../../../features/ui";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useTheme } from "@emotion/react";
import useMediaQueries from "../../../utils/helpers/useMediaQueries.utils";
const EventSignUpForm = ({ data, currentSeason, closeModal }) => {
  const { isSm } = useMediaQueries();
  const theme = useTheme();
  const { sendEmail, response, loading, error } = useEmailService(process.env.REACT_APP_AWS_API_BASE_URL_DEV);
  const currentSeasonData = data?.seasons?.[currentSeason?.toLowerCase()] || data;
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (formData) => {
    formData.formMetaData = {
      formType: "eventSignUp",
      formName: `${currentSeason} ${data.title}`,
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
    sendEmail(formData);
    reset();
    setTimeout(() => {
      closeModal();
    }, 3000);
  };

  // Updated helper component with improved styling
  const InfoItem = ({ icon, label, value }) => (
    <Stack
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
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 800, mx: "auto" }}>
      {/* <Typography variant="h4" component="h1" gutterBottom>
        Event Sign Up Form
      </Typography> */}

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
          <InfoItem icon={<CalendarMonthIcon />} label="DATE" value={currentSeasonData.startDateTime?.split("T")[0]} />

          <InfoItem
            icon={<AccessTimeIcon />}
            label="TIME"
            value={`${currentSeasonData.startDateTime?.split("T")[1]} - ${currentSeasonData.endDateTime?.split("T")[1]}`}
          />

          {isSm && <InfoItem icon={<LocationOnIcon />} label="LOCATION" value={locationValue} />}
        </Box>
      </Stack>

      <Grid container direction="column" spacing={2} mb={4}>
        {formConfig.map((field, index) => (
          <Grid key={index} item xs={12}>
            <Controller
              key={field.name}
              name={field.name}
              control={control}
              rules={{
                required: field.rules.required,
                pattern: field.rules.pattern,
              }}
              render={({ field: formField }) => (
                <InputFieldComponent
                  type={field.type}
                  label={field.label}
                  placeholder={field.placeholder}
                  fullWidth
                  margin="normal"
                  value={formField.value}
                  onChange={formField.onChange}
                  error={Boolean(errors[field.name])}
                  helperText={errors[field.name]?.message}
                  {...formField}
                />
              )}
            />
          </Grid>
        ))}
      </Grid>
      {(loading || error || response) && (
        <FormStatusIndicator statusMessage={response?.data?.message} statusCode={response?.status} loading={loading} error={error} />
      )}
      <Button type="submit" variant="contained" color="secondary" fullWidth sx={{ mt: 3 }}>
        Submit
      </Button>
    </Box>
  );
};

export default EventSignUpForm;

// 1. Input fields - Event name, player name, player email, player phone, parent/guardian name, parent/guardian email, parent/guardian phone
