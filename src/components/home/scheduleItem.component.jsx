import { ListItem, ListItemText, Box } from "@mui/material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import React from "react";

export default function ScheduleItem({ gameData }) {
  // time - key on gameData object
  const { date, location, homeTeam, awayTeam } = gameData;
  return (
    <ListItem sx={{ bgcolor: "green", textAlign: "left" }}>
      <ListItemText primary={date} sx={{ flex: 1 }} />
      <ListItemText sx={{ display: "flex", flex: 1 }} primary={<AlternateEmailIcon sx={{ height: "1rem" }} />} secondary={location} />

      <Box sx={{ display: "flex", flex: 2, textAlign: "center" }}>
        <ListItemText primary={homeTeam} sx={{ flex: 2 }} />
        <ListItemText primary="Vs." sx={{ flex: 1 }} />
        <ListItemText primary={awayTeam} sx={{ flex: 2 }} />
      </Box>
    </ListItem>
  );
}
