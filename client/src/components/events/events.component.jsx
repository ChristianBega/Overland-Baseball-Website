import { Grid, Paper, Table, TableContainer, Typography } from "@mui/material";
import React from "react";
import EventItems from "./eventItems.component";
const eventData = [
  {
    eventName: "Fundraiser",
    location: "123 Abc St.",
    time: "11:00",
    date: "March 12th",
    description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    extraInformation: "Dolor in reprehenderit in voluptate...",
  },
  {
    eventName: "Broncho's Game",
    location: "303 Apple St.",
    time: "12:00",
    date: "April 16th",

    description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    extraInformation: "Dolor in reprehenderit in voluptate...",
  },
  {
    eventName: "Tournament ",
    location: "123 Broadway Ave.",
    time: "10:00",
    date: "June 1st",

    description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    extraInformation: "Dolor in reprehenderit in voluptate...",
  },
  {
    eventName: "Fundraiser",
    location: "312 Abc St.",
    time: "2:00",
    date: "July 29th",

    description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    extraInformation: "Dolor in reprehenderit in voluptate...",
  },
];
export default function Events() {
  return (
    <Grid item xs={12}>
      <Typography typography="h2" sx={{ textAlign: "center", mt: 5 }}>
      
        Upcoming Events!
      </Typography>
      <TableContainer component={Paper} sx={{ color: "#000", my: 6 }}>
        <Table aria-label="simple table">
          {eventData.map((event, index) => (
            <EventItems key={index} event={event} />
          ))}
        </Table>
      </TableContainer>
    </Grid>
  );
}
