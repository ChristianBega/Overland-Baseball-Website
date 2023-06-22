import { Stack, TextField, Typography, Button, Box } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useForm } from "react-hook-form";
import React from "react";

export default function YouthProgramForm() {
  const theme = useTheme();
  // React hook form useForm for registering, handling, and reset forms

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
        Overland's youth baseball program
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        {/* Error handling */}
        <Stack id="modal-form" spacing={4}>
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
          {/* Will need validation */}
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
              pattern: { value: /([1-9][0-9]*)|0/i, message: "Invalid phone number *" },
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
              pattern: { value: /([1-9][0-9]*)|0/i, message: "Invalid phone number *" },
            })}
          />
          <Button onSubmit={onSubmit} type="submit" sx={{ mt: 6, alignSelf: "center" }} id="submit" size="medium">
            Submit
          </Button>
        </Stack>
      </Box>
    </>
  );
}
