import { Box, Grid } from "@mui/material";
import React from "react";
import TryoutsImage from "../../assets/tryouts2.jpg";
export default function TryoutsSlider() {
  return (
    <Grid item xs={12} md={4} sx={{ display: "flex", justifyContent: "center" }}>
      <Box component="img" src={TryoutsImage} sx={{ height: "100%", width: { xs: "75%", md: "100%" } }}></Box>
    </Grid>
  );
}
