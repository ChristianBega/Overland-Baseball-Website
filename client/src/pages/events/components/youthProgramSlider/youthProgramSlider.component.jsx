import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import YouthProgramImage from "../../../../assets/eventsPage/youthProgramImage.webp";

export default function YouthProgramSlider({ isMobile }) {
  return (
    <Grid item xs={12} md={4} sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
      {isMobile && <Typography typography="h2">Youth Program</Typography>}
      <Box
        component="img"
        src={YouthProgramImage}
        sx={{ height: { xs: "100%", md: "518px" }, width: { xs: "100%", sm: "375px", md: "100%" }, maxWidth: "550px", maxHeight: "550px" }}
      ></Box>
    </Grid>
  );
}
