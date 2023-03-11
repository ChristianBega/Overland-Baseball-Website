import React from "react";
import { List, Grid } from "@mui/material";

import ScheduleItem from "./scheduleItem.component";

const scheduleData = [
  {
    date: "12-12-12",
    location: "Overland",
    time: "12:12",
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
    <Grid item xs={12} lg={8}>
      <List>
        {scheduleData.map((gameData, index) => (
          <ScheduleItem gameData={gameData} key={index} />
        ))}
      </List>
    </Grid>
  );
}
