import React from "react";
// Mui
import { Grid, Typography } from "@mui/material";
// Components
import SectionLayout from "../../../../../components/reusableComponents/sectionLayout/sectionLayout.component";
import InputFieldComponent from "../../../../../components/inputFields/inputFields";
import { Controller, useForm } from "react-hook-form";
import { Box, Button } from "@mui/material";
// Config
import contactUsConfig from "./contactUs.config.json";

export default function ContactUs() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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

          <Button type="submit" variant="contained" color="secondary" fullWidth>
            Submit
          </Button>
        </Box>
      </SectionLayout>
    </Grid>
  );
}
