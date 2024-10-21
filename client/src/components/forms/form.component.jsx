import { useTheme } from "@emotion/react";
import { Box, Button, Stack, TextField, Typography, IconButton, Alert, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import EmailService from "../../setup/utils/emailServices/emailService";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import styled from "@emotion/styled";
import CloseIcon from "@mui/icons-material/Close";
import { SelectInput } from "./selectInput.component";
const StyledDataBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: 3,
  alignItems: "center",
}));

export default function Form({ currentEventData, handleClose, datatypeRegistration, currentSeason, setCurrentEventData, setCurrentSeason }) {
  console.log("currentEventData", currentEventData);
  const [success, setSuccess] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (datatypeRegistration === "volunteer" || "events") {
      EmailService.sendEmailVolunteer(data, currentEventData);
    } else {
      EmailService.sendEmailRegistration(data, datatypeRegistration, currentEventData, currentSeason);
    }

    const timer = setTimeout(() => {
      handleClose(true);
    }, 4000);
    reset();
    setSuccess(true);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    if (success) {
      document.getElementById("success").scrollIntoView();
    }
  }, [success]);
  return (
    <>
      <div style={{ padding: "1rem" }}>
        {/* Close Button */}
        <IconButton onClick={handleClose} size="medium" sx={{ justifyContent: "center", color: "theme.palette.primary.main", width: "10%" }}>
          <CloseIcon />
        </IconButton>
        {/* Form Title */}
        <Typography
          sx={{ textTransform: "uppercase", textAlign: "center", my: 5, color: theme.palette.primary.main }}
          id="modal-title"
          variant="h3"
          component="h2"
        >
          {currentSeason} {datatypeRegistration} form
        </Typography>
      </div>
      {/* Form */}
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          color: theme.palette.primary.main,
          maxHeight: { xs: "80%" },
          overflowY: "auto",
          padding: "1rem",
        }}
      >
        {/* Form Information Title */}
        <Typography sx={{ color: theme.palette.primary.main }} variant="h6" component="h3">
          Event Information:
        </Typography>
        {/* Form Information */}
        <Stack sx={{ color: theme.palette.secondary.main, mt: 3, mb: 5 }} spacing={isMobile ? 4 : 6} direction="row">
          <StyledDataBox>
            <PlaceIcon />
            <Typography sx={{ fontSize: { xs: "12px", md: "1rem" } }}>
              {datatypeRegistration === "volunteer"
                ? currentEventData?.event || currentEventData?.eventName
                : datatypeRegistration === "events"
                ? currentEventData?.eventName || currentEventData?.event
                : datatypeRegistration === "boosters club"
                ? currentEventData?.eventName || currentEventData?.event
                : null}
            </Typography>
          </StyledDataBox>
          <StyledDataBox>
            <CalendarMonthIcon />
            <Typography sx={{ fontSize: { xs: "12px", md: "1rem" } }}>{currentEventData?.date}</Typography>
          </StyledDataBox>
          <StyledDataBox>
            <AccessTimeIcon />
            <Typography sx={{ fontSize: { xs: "12px", md: "1rem" } }}>{currentEventData?.time}</Typography>
          </StyledDataBox>
        </Stack>
        {/* <p>Maybe select input here to reselect event</p> */}
        {datatypeRegistration !== "youth program" && (
          <SelectInput
            currentEventData={currentEventData}
            setCurrentEventData={setCurrentEventData}
            datatypeRegistration={datatypeRegistration}
            currentSeason={currentSeason}
            setCurrentSeason={setCurrentSeason}
          />
        )}

        <Stack id="modal-form" spacing={4} mt={3}>
          <Typography sx={{ color: theme.palette.primary.main }} variant="h6" component="h3">
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

          <Typography sx={{ color: theme.palette.primary.main }} variant="h6" component="h3">
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

          <Button onSubmit={onSubmit} type="submit" sx={{ mt: 6, alignSelf: "center" }} id="submit" size="medium">
            Confirm
          </Button>
        </Stack>
        {success && (
          <Alert id="success" sx={{ mt: 8 }} severity="success">
            Success!!
          </Alert>
        )}
      </Box>
    </>
  );
}
