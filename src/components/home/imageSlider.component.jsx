import { Box, Grid } from "@mui/material";
import React from "react";

export default function ImageSlider() {
  return (
    <Grid item xs={12} md={4} lg={5}>
      <Box sx={{ bgcolor: "orange", height: "100%" }}>Image Slider</Box>
    </Grid>
  );
}
