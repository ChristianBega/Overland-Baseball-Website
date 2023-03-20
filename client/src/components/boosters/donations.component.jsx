import { Box, Grid } from "@mui/material";
import React from "react";

export default function Donations() {
  return (
    <Grid xs={6} item>
      <Box sx={{ height: "250px", backgroundColor : "lightgreen" }}>Donations || when clicked send to strip payment</Box>
    </Grid>
  );
}
