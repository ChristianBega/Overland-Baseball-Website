import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Box, Typography, Stack, Grid } from "@mui/material";
import formConfig from "./eventSignUp.config.json";
import InputFieldComponent from "../../../../components/inputFields/inputFields";
import useEmailService from "../../../../hooks/useEmailServices";
import FormStatusIndicator from "../../../../components/statusIndicators/formStatusIndicator";

const EventSignUpForm = ({ data, currentSeason, closeModal }) => {
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
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 600, mx: "auto", p: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Event Sign Up Form
      </Typography>

      <Stack
        direction="column"
        spacing={2}
        sx={{
          mb: 3,
          backgroundColor: "grey.50",
          p: 2,
          borderRadius: 1,
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          mb={0}
          sx={{
            color: "primary.main",
            fontWeight: 500,
          }}
        >
          <strong>Event:</strong> {data.title} - {currentSeason}
        </Typography>
        <Typography variant="body1" component="p">
          <strong>Start Time & Date:</strong> {currentSeasonData.startDateTime}
        </Typography>
        <Typography variant="body1" component="p">
          <strong>End Time & Date:</strong> {currentSeasonData.endDateTime}
        </Typography>
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
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
        Submit
      </Button>
    </Box>
  );
};

export default EventSignUpForm;

// 1. Input fields - Event name, player name, player email, player phone, parent/guardian name, parent/guardian email, parent/guardian phone
