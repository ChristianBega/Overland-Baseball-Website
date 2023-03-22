import { Grid, List, Paper, Table, TableContainer } from "@mui/material";
import React from "react";
import EventItems from "./eventItems.component";
const eventData = [
  {
    eventName: "Fundraiser",
    location: "123 Abc St.",
    time: "11:00",
    date: "12/12/12",
    description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    extraInformation: "Dolor in reprehenderit in voluptate...",
  },
  {
    eventName: "Fundraiser",
    location: "123 Abc St.",
    time: "12:00",
    date: "3/12/12",

    description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    extraInformation: "Dolor in reprehenderit in voluptate...",
  },
  {
    eventName: "Fundraiser",
    location: "123 Abc St.",
    time: "10:00",
    date: "6/1/15",

    description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    extraInformation: "Dolor in reprehenderit in voluptate...",
  },
  {
    eventName: "Fundraiser",
    location: "123 Abc St.",
    time: "2:00",
    date: "12/11/15",

    description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    extraInformation: "Dolor in reprehenderit in voluptate...",
  },
];
export default function Events() {
  return (
    <Grid item xs={12}>
      <TableContainer component={Paper} sx={{ color: "#000" }}>
        <Table aria-label="simple table">
          {eventData.map((event, index) => (
            <EventItems key={index} event={event} />
          ))}
        </Table>
      </TableContainer>
    </Grid>
  );
}
