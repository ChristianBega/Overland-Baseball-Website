import { useTheme } from "@emotion/react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import EmailService from "../../services/emailService";
// Icons
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import styled from "@emotion/styled";

const StyledDataBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: 3,
  alignItems: "center",
}));
export default function VolunteerForm({ currentEventData }) {
  const theme = useTheme();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    EmailService.sendEmailVolunteer(data, currentEventData);
    reset();
  };

  return (
    <>
      <Typography
        sx={{ textTransform: "uppercase", textAlign: "center", my: 5, color: theme.palette.secondary.main }}
        id="modal-title"
        variant="h4"
        component="h2"
      >
        Overland's volunteer form
      </Typography>
      <Typography>Event Information:</Typography>
      <Stack spacing={{ xs: 2, md: 4 }} direction="row" mt={3} mb={5}>
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
      <Typography>Volunteer Information: </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
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
      </Box>
    </>
  );
}
