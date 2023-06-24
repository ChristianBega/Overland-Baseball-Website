import { Box, Grid } from "@mui/material";
import React from "react";
import YouthProgramImage from "../../assets/eventsPage/youthProgramImage.webp";

export default function YouthProgramSlider() {
  return (
    <Grid
      item
      xs={12}
      md={4}
      mt={{ xs: 5, sm: 10 }}
      mb={{ xs: 10 }}
      sx={{ minHeight: "400px", maxHeight: { xs: "500px", md: "475px" }, display: "flex", justifyContent: "center" }}
    >
      <Box component="img" src={YouthProgramImage} sx={{ height: "100%", width: { xs: "75%", sm: "375px" } }}></Box>
    </Grid>
  );
}
