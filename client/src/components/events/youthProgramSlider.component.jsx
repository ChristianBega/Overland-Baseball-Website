import { Box, Grid } from "@mui/material";
import React from "react";
import YouthProgramImage from "../../assets/youthProgramImage.jpg";

export default function YouthProgramSlider() {
  return (
    <Grid item xs={12} md={4} mb={10} sx={{ minHeight: "400px", maxHeight: { xs: "500px", md: "475px" }, display: "flex", justifyContent: "center" }}>
      <Box component="img" src={YouthProgramImage} sx={{ height: "100%", width: { xs: "75%", md: "100%" } }}></Box>
    </Grid>
  );
}
