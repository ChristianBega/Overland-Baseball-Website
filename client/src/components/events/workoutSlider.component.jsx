import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import WorkoutsImage from "../../assets/eventsPage/workouts.webp";

export default function WorkoutSlider({ isMobile }) {
  return (
    <Grid item xs={12} md={4} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      {isMobile && <Typography typography="h2">Workouts</Typography>}
      <Box component="img" src={WorkoutsImage} sx={{ maxHeight: "450px", height: "100%", width: { xs: "100%", sm: "375px", md: "100%" } }}></Box>
    </Grid>
  );
}
