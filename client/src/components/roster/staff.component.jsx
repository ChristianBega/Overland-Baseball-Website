import React, { useEffect, useState } from "react";
import { Grid, TableContainer, Typography } from "@mui/material";
import StaffItem from "./staffItem.component";
const staffData = [
  {
    team: "varsity",
    coach: "Mike Bega",
    assistantCoach: "Tyler Bame",
    teamManager: "N/A",
  },
  {
    team: "jv",
    coach: "Jv head coach",
    assistantCoach: "Jv coach name",
    teamManager: "Jv coach name",
  },
  {
    team: "freshman",
    coach: "Freshman head coach",
    assistantCoach: "coach name",
    teamManager: "coach name",
  },
];

export default function Staff({ currentTeam }) {
  const [currentRooster, setCurrentRooster] = useState([]);
  useEffect(() => {
    setCurrentRooster(staffData.filter((team) => team.team === currentTeam));
  }, [currentTeam]);
  return (
    <Grid item xs={12} sx={{ minHeight: { xs: "275px", md: "250px" }, textAlign: "center" }}>
      <TableContainer mb={5}>
        <Typography typography="h1" component="h1" variant="h2">
          {currentTeam} Roster
        </Typography>
        <StaffItem currentRooster={currentRooster} />
      </TableContainer>
    </Grid>
  );
}
