import { Box, Grid } from "@mui/material";
import React from "react";

export default function Test() {
  return (
    <Grid item xs={12} md={4} lg={6}>
      <Box sx={{ bgcolor: "orange", height: "100%" }}>Image Slide</Box>
    </Grid>
  );
}
