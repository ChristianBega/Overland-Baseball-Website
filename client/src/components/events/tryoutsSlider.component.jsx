import { Box, Grid } from "@mui/material";
import React from "react";
import TryoutsImage from "../../assets/eventsPage/tryouts.webp";
export default function TryoutsSlider() {
  return (
    <Grid item xs={12} md={4} sx={{ my: { md: 10 }, display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Box component="img" src={TryoutsImage} sx={{ height: "80%", width: { xs: "75%", sm: "375px" } }}></Box>
    </Grid>
  );
}
