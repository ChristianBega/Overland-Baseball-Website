import { Box, Grid } from "@mui/material";
import React from "react";
import TryoutsImage from "../../assets/tryouts2.jpg";
export default function TryoutsSlider() {
  return (
    <Grid item xs={12} md={5}>
      <Box component="img" src={TryoutsImage} sx={{ height: "100%", width: "100%" }}></Box>
    </Grid>
  );
}
