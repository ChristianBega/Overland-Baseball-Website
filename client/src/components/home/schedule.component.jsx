import React from "react";
import { Paper, Grid, TableContainer, Table } from "@mui/material";

import ScheduleItem from "./scheduleItem.component";

const scheduleData = [
  {
    date: "Fri 27th",
    time: "2:00",
    location: "Overland",
    homeTeam: "Overland",
    awayTeam: "Opponent",
  },
  {
    date: "14-14-14",
    location: "Vista",
    time: "14:14",
    homeTeam: "Overland",
    awayTeam: "Opponent",
  },
  {
    date: "16-16-16",
    location: "Creek",
    time: "16:16",
    homeTeam: "Overland",
    awayTeam: "Opponent",
  },
  {
    date: "12-12-12",
    location: "Central",
    time: "12:12",
    homeTeam: "Overland",
    awayTeam: "Opponent",
  },
  {
    date: "18-18-18",
    location: "Overland",
    time: "18:18",
    homeTeam: "Overland",
    awayTeam: "Opponent",
  },
];

export default function schedule() {
  return (
    <Grid item xs={12} lg={10}>
      {/* <List disablePadding>
        {scheduleData.map((gameData, index) => (
          <ScheduleItem gameData={gameData} key={index} />
        ))}
      </List> */}
      <TableContainer component={Paper} sx={{ color: "#000",  }}>
        <Table  aria-label="simple table">
          {scheduleData.map((gameData, index) => (
            <ScheduleItem gameData={gameData} key={index} />
          ))}
        </Table>
      </TableContainer>
    </Grid>
  );
} 
