import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import TryoutsImage from "../../../../assets/eventsPage/tryouts.webp";
export default function TryoutsSlider({ isMobile }) {
  return (
    <Grid item xs={12} md={4} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      {isMobile && <Typography typography="h2">Tryouts</Typography>}
      <Box component="img" src={TryoutsImage} sx={{ maxHeight: "450px", width: { xs: "100%", sm: "375px", md: "100%" } }}></Box>
    </Grid>
  );
}
