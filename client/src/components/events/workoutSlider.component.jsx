import { Box, Grid } from "@mui/material";
import React from "react";
import WorkoutsImage from "../../assets/eventsPage/workouts.webp";

export default function WorkoutSlider() {
  return (
    <Grid item xs={12} md={6} my={10} sx={{ display: "flex", justifyContent: "center" }}>
      <Box component="img" src={WorkoutsImage} sx={{ height: "100%", width: { xs: "75%", sm: "375px" } }}></Box>
    </Grid>
  );
}
