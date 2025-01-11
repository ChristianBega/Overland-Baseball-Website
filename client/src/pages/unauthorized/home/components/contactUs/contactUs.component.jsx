import React from "react";
import { Controller, useForm } from "react-hook-form";
// Mui
import { Grid, Typography, Box, Button } from "@mui/material";
// Components
import SectionLayout from "../../../../../components/reusableComponents/sectionLayout/sectionLayout.component";
import InputFieldComponent from "../../../../../components/inputFields/inputFields";
import FormStatusIndicator from "../../../../../components/statusIndicators/formStatusIndicator";
// config
import contactUsConfig from "./contactUs.config.json";
// hooks
import useEmailService from "../../../../../hooks/useEmailServices";

export default function ContactUs() {
  const { sendEmail, response, loading, error } = useEmailService(process.env.REACT_APP_AWS_API_BASE_URL_DEV);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await sendEmail(data);
    } catch (error) {
      console.error("Error submitting form:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <Grid item xs={12}>
      <SectionLayout id="contact-us-section" aria-label="Contact Us Section">
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h2" component="h2">
            Contact Us
          </Typography>
          <Typography variant="body1" component="p" mb={4}>
            Whether you're a player interested in our baseball program, a parent or student looking to volunteer, or a business wanting to support our
            student-athletes – we want to hear from you. Contact us today to learn how to become part of the Trailblazer family.
          </Typography>
          <Grid container spacing={2} mb={4}>
            {contactUsConfig.map(({ name, label, placeholder, type, rules }, index) => (
              <Grid key={index + name} item xs={12}>
                <Controller
                  key={index + 1}
                  name={name}
                  control={control}
                  rules={rules}
                  render={({ field }) => (
                    <InputFieldComponent
                      type={type}
                      label={label}
                      placeholder={placeholder}
                      fullWidth
                      value={field.value}
                      onChange={field.onChange}
                      error={Boolean(errors[name])}
                      helperText={errors[name]?.message}
                      {...field}
                    />
                  )}
                />
              </Grid>
            ))}
          </Grid>
          {(loading || error || response) && (
            <FormStatusIndicator statusMessage={response?.data?.message} statusCode={response?.status} loading={loading} error={error} />
          )}
          <Button type="submit" variant="contained" color="secondary" fullWidth>
            Submit
          </Button>
        </Box>
      </SectionLayout>
    </Grid>
  );
}
