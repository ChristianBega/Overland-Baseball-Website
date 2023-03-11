import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function ScheduleItem() {
  return (
    <Grid item xs={12} lg={5}>
      <Box sx={{ bgcolor: "green" }}>Schedule</Box>
    </Grid>
  );
}
