import { Stack, TextField, Typography, Button, Box, IconButton, Alert } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useForm } from "react-hook-form";
import EmailService from "../../services/emailService";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
export default function RegistrationForm({ datatypeRegistration, handleClose }) {
  const theme = useTheme();
  const [success, setSuccess] = useState(false);

  // React hook form useForm for registering, handling, and reset forms
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    EmailService.sendEmailRegistration(data, datatypeRegistration);
    const timer = setTimeout(() => {
      handleClose(true);
    }, 3000);
    reset();
    setSuccess(true);
    reset();
    return () => clearTimeout(timer);
  };

  return (
    <>
      <IconButton onClick={handleClose} size="medium" sx={{ justifyContent: "center", color: "theme.palette.primary.main", width: "10%" }}>
        <CloseIcon />
      </IconButton>
      <Typography
        sx={{
          textTransform: "uppercase",
          textAlign: "center",
          my: 6,
          color: theme.palette.primary.main,
          fontSize: { xs: "1.3rem", md: "1.8rem" },
        }}
        id="modal-title"
        variant="h3"
        component="h2"
      >
        Overland's {datatypeRegistration} <br /> Registration Forum
      </Typography>
      <Box component="form" sx={{ maxHeight: { xs: "400px", overflowY: "auto" } }} onSubmit={handleSubmit(onSubmit)}>
        <Stack id="modal-form" spacing={4} color={theme.palette.primary.main}>
          <Typography variant="h6" component="h3">
            Player Information:
          </Typography>
          {/* Player name */}
          <TextField
            id="playerName"
            label="Player Name"
            variant="outlined"
            helperText={errors.player_name?.message}
            {...register("player_name", {
              required: "Name is required *",
              pattern: { value: /^[A-Za-z]+$/i, message: "Invalid character or number *" },
            })}
          />
          {/* Player email */}
          <TextField
            id="playerEmail"
            label="Player Email"
            variant="outlined"
            helperText={errors.player_email?.message}
            {...register("player_email", {
              required: "Email is required *",
              pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address *" },
            })}
          />
          {/* Player phone */}
          <TextField
            id="playerPhone"
            label="Player Phone Number"
            variant="outlined"
            helperText={errors.player_phone?.message}
            {...register("player_phone", {
              required: "Phone is required *",
              pattern: { value: /^[0-9]*$/, message: "Invalid phone number *" },
              minLength: {
                value: 7,
                message: "Must be a minimum of 7 numbers *",
              },
              maxLength: {
                value: 11,
                message: "Can not exceed 11 numbers *",
              },
            })}
          />
          <Typography variant="h6" component="h3">
            Parent/Guardian Information:
          </Typography>
          {/* Guardian Name */}
          <TextField
            id="guardianName"
            label="Parent/Guardian Name"
            variant="outlined"
            helperText={errors.guardian_name?.message}
            {...register("guardian_name", {
              required: "Name is required *",
              pattern: { value: /^[A-Za-z]+$/i, message: "Invalid character or number *" },
            })}
          />
          {/* Guardian Email */}
          <TextField
            id="guardianName"
            label="Parent/Guardian Email"
            variant="outlined"
            helperText={errors.guardian_email?.message}
            {...register("guardian_email", {
              required: "Email is required *",
              pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address *" },
            })}
          />
          {/* Guardian Phone */}
          <TextField
            id="guardianName"
            label="Parent/Guardian Phone Number"
            variant="outlined"
            helperText={errors.guardian_phone?.message}
            {...register("guardian_phone", {
              required: "Phone is required *",
              pattern: {
                value: /^[0-9]*$/,
                message: "Invalid phone number *",
              },
              minLength: {
                value: 7,
                message: "Must be a minimum of 7 numbers *",
              },
              maxLength: {
                value: 11,
                message: "Can not exceed 11 numbers *",
              },
            })}
          />
          <Button onSubmit={onSubmit} type="submit" sx={{ alignSelf: "center" }} id="submit" size="medium">
            Submit
          </Button>
        </Stack>
        {success && (
          <Alert sx={{ mt: 8 }} severity="success">
            Success!!
          </Alert>
        )}
      </Box>
    </>
  );
}
