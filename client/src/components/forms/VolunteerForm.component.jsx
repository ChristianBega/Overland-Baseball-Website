import { useTheme } from "@emotion/react";
import { Box, Button, Stack, TextField, Typography, IconButton, Alert } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import EmailService from "../../services/emailService";
// Icons
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import styled from "@emotion/styled";
import CloseIcon from "@mui/icons-material/Close";

const StyledDataBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: 3,
  alignItems: "center",
}));
export default function VolunteerForm({ currentEventData, handleClose }) {
  const [success, setSuccess] = useState(false);
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    EmailService.sendEmailVolunteer(data, currentEventData);
    const timer = setTimeout(() => {
      handleClose(true);
    }, 3000);
    reset();
    setSuccess(true);
    return () => clearTimeout(timer);
  };

  return (
    <>
      <IconButton onClick={handleClose} size="medium" sx={{ justifyContent: "center", color: "theme.palette.primary.main", width: "10%" }}>
        <CloseIcon />
      </IconButton>
      <Typography
        sx={{ textTransform: "uppercase", textAlign: "center", my: 5, color: theme.palette.primary.main }}
        id="modal-title"
        variant="h3"
        component="h2"
      >
        Overland's volunteer form
      </Typography>
      <Typography sx={{ color: theme.palette.primary.main }} variant="h6" component="h3">
        Event Information:
      </Typography>
      <Stack sx={{ color: theme.palette.secondary.main, justifyContent: "center" }} spacing={{ xs: 2, md: 4 }} direction="row" mt={3} mb={5}>
        <StyledDataBox>
          <PlaceIcon />
          <Typography sx={{ fontSize: { xs: "12px", md: "1rem" } }}>{currentEventData.event}</Typography>
        </StyledDataBox>
        <StyledDataBox>
          <AccessTimeIcon />
          <Typography sx={{ fontSize: { xs: "12px", md: "1rem" } }}>{currentEventData.time}</Typography>
        </StyledDataBox>
        <StyledDataBox>
          <CalendarMonthIcon />
          <Typography sx={{ fontSize: { xs: "12px", md: "1rem" } }}>{currentEventData.date}</Typography>
        </StyledDataBox>
      </Stack>
      <Typography sx={{ color: theme.palette.primary.main }} variant="h6" component="h3">
        Volunteer Information:{" "}
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ color: theme.palette.primary.main }}>
        <Stack id="modal-form" spacing={4} mt={3}>
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

          <Button onSubmit={onSubmit} type="submit" sx={{ mt: 6, alignSelf: "center" }} id="submit" size="medium">
            Confirm
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
