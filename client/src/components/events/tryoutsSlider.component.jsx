import { Box, Grid } from "@mui/material";
import React from "react";
import TryoutsImage from "../../assets/eventsPage/tryouts.webp";
export default function TryoutsSlider() {
  return (
    <Grid item xs={12} md={4} mt={10} sx={{ display: "flex", justifyContent: "center" }}>
      <Box component="img" src={TryoutsImage} sx={{ height: "400px", width: { xs: "280px", md: "100%" } }}></Box>
    </Grid>
  );
}
