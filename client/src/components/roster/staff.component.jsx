import React, { useEffect, useState } from "react";
import { Grid, TableContainer, Typography } from "@mui/material";
import StaffItem from "./staffItem.component";
import { useTheme } from "@emotion/react";
const staffData = [
  {
    team: "varsity",
    coach: "Mike Bega",
    assistantCoach: "Steve Gonzalez ",
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
  const theme = useTheme();
  const [currentRooster, setCurrentRooster] = useState([]);
  useEffect(() => {
    setCurrentRooster(staffData.filter((team) => team.team === currentTeam));
  }, [currentTeam]);
  return (
    <Grid item xs={12} sx={{ mt: { xs: 5, sm: 10 }, minHeight: { xs: "275px", md: "250px" }, textAlign: "center" }}>
      <TableContainer mb={5}>
        <Typography
          typography="h1"
          sx={{ px: 4, my: { xs: 4, md: 6, lg: 8 }, textTransform: "uppercase", color: theme.palette.primary.main }}
          variant="h2"
        >
          {currentTeam} &nbsp;Roster
        </Typography>
        <StaffItem currentRooster={currentRooster} />
      </TableContainer>
    </Grid>
  );
}
