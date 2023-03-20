import { Box, Grid } from "@mui/material";
import React from "react";
export default function Sponsors() {
  return (
    <>
      <Grid item xs={12}>
        <Box sx={{ bgcolor: "lightblue", minHeight: { xs: "200px", md: "260px", lg: "300x" } }}>Sponsors</Box>
      </Grid>
    </>
  );
}
