import React from "react";
import { ListItem, ListItemText } from "@mui/material";

export default function StaffItem({ currentRooster }) {
  return (
    <>
      {currentRooster.map((teamData) => (
        <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <ListItemText primary={teamData.coach} />
          <ListItemText primary={teamData.assistantCoach} />
          <ListItemText primary={teamData.teamManager} />
        </ListItem>
      ))}
    </>
  );
}
