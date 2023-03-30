import React, { useEffect, useState } from "react";
import { Grid, TableContainer, Table, Typography } from "@mui/material";
import StaffItem from "./staffItem.component";
const staffData = [
  {
    team: "varsity",
    coach: "Varsity head coach",
    assistantCoach: "Varsity Coach name",
    teamManager: "Varsity Coach name",
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
    <Grid item xs={12} sx={{ minHeight: { xs: "275px", md: "250px", textAlign: "center" } }}>
      <TableContainer mb={5}>
        <Typography typography="h1" sx={{ px: 4, my: { xs: 4, md: 6, lg: 8 }, textTransform: "uppercase" }} variant="h2">
          {currentTeam} &nbsp;Roster
        </Typography>
        <Table>
          <StaffItem currentRooster={currentRooster} />
        </Table>
      </TableContainer>
    </Grid>
  );
}
