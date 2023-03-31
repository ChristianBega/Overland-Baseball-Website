import { Box, Grid } from "@mui/material";
import React from "react";
import YouthProgramImage from "../../assets/youthProgramImage.jpg";

export default function YouthProgramSlider() {
  return (
    <Grid item xs={12} md={4} my={10}>
      <Box component="img" src={YouthProgramImage} sx={{ height: "100%", width: "100%" }}></Box>
    </Grid>
  );
}
