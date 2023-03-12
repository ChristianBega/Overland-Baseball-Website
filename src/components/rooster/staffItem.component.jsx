import React from "react";
import { ListItem, ListItemText } from "@mui/material";

const staffData = [
  {
    team: "varsity",
    coach: "Varsity head coach",
    assistantCoach: "Varsity Coach name",
    teamManager: "Varsity Coach name",
  },
  // {
  //   team: "junior-varsity",
  //   coach: "Jv head coach",
  //   assistantCoach: "Jv coach name",
  //   teamManager: "Jv coach name",
  // },
  // {
  //   team: "freshman",
  //   coach: "Freshman head coach",
  //   assistantCoach: "coach name",
  //   teamManager: "coach name",
  // },
];

export default function StaffItem() {
  return (
    <>
      {staffData.map((team) => (
        <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <ListItemText primary={team.coach} />
          <ListItemText primary={team.assistantCoach} />
          <ListItemText primary={team.teamManager} />
        </ListItem>
      ))}
    </>
  );
}
