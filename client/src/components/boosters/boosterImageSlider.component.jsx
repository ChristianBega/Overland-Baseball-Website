import { Box, Grid, Typography } from "@mui/material";
import React from "react";

export default function BoosterImageSlider({ isMobile, boosterData }) {
  return (
    <Grid
      item
      xs={12}
      md={4}
      sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", paddingBlock: { xs: 0, md: 8 } }}
    >
      {isMobile && <Typography typography="h2">{boosterData.title}</Typography>}
      <Box component="img" src={boosterData.image} sx={{ height: "100%", width: "100%", minHeight: "300px" }}></Box>
    </Grid>
  );
}
