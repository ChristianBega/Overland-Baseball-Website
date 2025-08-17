import React from "react";
import { Controller, useForm } from "react-hook-form";
// Mui
import { Grid, Typography, Box, Button, Stack, IconButton } from "@mui/material";
// Components
import SectionLayout from "../../ui/components/SectionLayout";
import InputFieldComponent from "../../ui/components/InputFields";
import { FormStatusIndicator } from "../../ui";
// config
import contactUsConfig from "../data/contactUs.config.json";
// hooks
import useEmailService from "../../../hooks/useEmailServices";
import useMediaQueries from "../../../utils/helpers/useMediaQueries.utils";
import SectionHeader from "../../ui/components/SectionHeader";
import { useTheme } from "@emotion/react";
import TextBlock from "../../ui/components/TextBlock";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { StyledForm } from "../../ui/components/StyledForm";

// Todo: Turn to a UI component for easier reuse
const SocialMediaIcons = () => {
  const theme = useTheme();
  const { isLg } = useMediaQueries();
  return (
    <Stack direction="row" spacing={2} alignItems="center" mt={isLg ? 2 : 0} mb={2}>
      <IconButton>
        <Facebook sx={{ color: theme.palette.secondary.main }} />
      </IconButton>
      <IconButton>
        <Instagram sx={{ color: theme.palette.secondary.main }} />
      </IconButton>
      <IconButton>
        <Twitter sx={{ color: theme.palette.secondary.main }} />
      </IconButton>
    </Stack>
  );
};

export default function ContactUs() {
  const theme = useTheme();
  const { isLg, isFormHeaderAndDown, isMd } = useMediaQueries();
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
      <SectionLayout id="contact-us-section" aria-label="Contact Us Section" marginBlock={true}>
        <Grid container id="contact-us-form-grid" columnSpacing={isLg ? 6 : 4} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={6}>
            <TextBlock>
              <SectionHeader
                title="Contact Us"
                subtitle="Have A Question?"
                color={theme.palette.secondary.main}
                cta={!isMd && !isFormHeaderAndDown && <SocialMediaIcons />}
                stackProps={{
                  direction: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}

                // ctaStackStyles={{ backgroundColor: "red" }}
              />
              <Typography typography="p" component="p">
                Whether you're a player interested in our baseball program, a parent or student looking to volunteer, or a business wanting to support
                our student-athletes – we want to hear from you. Contact us today to learn how to become part of the Trailblazer family.
              </Typography>
              {isMd && <SocialMediaIcons />}
            </TextBlock>
          </Grid>
          <Grid item xs={12} md={6}>
            <StyledForm component="form" onSubmit={handleSubmit(onSubmit)}>
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
                Send Your Message
              </Button>
            </StyledForm>
          </Grid>
        </Grid>
      </SectionLayout>
    </Grid>
  );
}
