import { Grid, Paper, Table, TableContainer, Typography } from "@mui/material";
import React from "react";
import EventItems from "./eventItems.component";
import { eventsData } from "../../websiteData/events.data";

// const columns = [
//   { field: "event", headerName: "Event", width: 70 },
//   { field: "location", headerName: "Location", width: 130 },
//   { field: "date", headerName: "Date", width: 130 },
//   { field: "time", headerName: "Time", width: 130 },
// ];
// const rows = [
//   {
//     event: "",
//     location: "",
//     date: "",
//     time: "",
//   },
// ];
export default function Events() {
  return (
    <Grid item xs={12}>
      <Typography typography="h2" sx={{ textAlign: "center", mt: 5 }}>
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
