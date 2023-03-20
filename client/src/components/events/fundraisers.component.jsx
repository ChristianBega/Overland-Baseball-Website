import Grid from "@mui/material/Grid/Grid";
import { Box } from "@mui/system";
import React from "react";

const fundraisersData = [
  {
    id: "Name 1",
    content: "box 1",
    date: "1-12-23",
    time: "11 am",
  },
  {
    id: "Name 2",
    content: "box 2",
    date: "2-12-23",
    time: "11 am",
  },
  {
    id: "Name 3",
    content: "box 3",
    date: "9-12-23",
    time: "1 pm",
  },
  {
    id: "Name 4",
    content: "box 4",
    date: "8-22-23",
    time: "8 pm",
  },
];

export default function Fundraisers() {
  return (
    <Grid item xs={12}>
      <Grid container maxWidth="lg" spacing={4}>
        {fundraisersData.map((fundraiser) => (
          <Grid item key={fundraiser.id} xs={12} md={6}>
            <Box sx={{ minHeight: { xs: "200px", lg: "250px", maxHeight: "250px" }, backgroundColor: "red" }}>{fundraiser.content}</Box>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
