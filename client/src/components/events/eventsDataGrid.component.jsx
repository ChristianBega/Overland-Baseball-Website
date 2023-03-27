import { Grid, Paper, Table, TableContainer, Typography } from "@mui/material";
import React from "react";
import EventItems from "./eventItems.component";
import { eventsData } from "../../websiteData/events.data";

export default function Events() {
  return (
    <Grid item xs={12}>
      <Typography typography="h2" sx={{ textAlign: "center", my: 10 }}>
        Upcoming Events!
      </Typography>
      <TableContainer component={Paper} sx={{ color: "#000", my: 6, maxHeight: 440 }}>
        <Table aria-label="simple table">
          {eventsData.map((event, index) => (
            <EventItems key={index} event={event} />
          ))}
        </Table>
      </TableContainer>
    </Grid>
  );
}
