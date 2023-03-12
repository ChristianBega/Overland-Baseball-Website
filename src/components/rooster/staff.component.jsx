import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import StaffItem from "./staffItem.component";
const staffData = [
  {
    team: "varsity",
    coach: "Varsity head coach",
    assistantCoach: "Varsity Coach name",
    teamManager: "Varsity Coach name",
  },
  {
    team: "junior-varsity",
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

// const getCurrentTeam = () => {};
export default function Staff({ currentTeam }) {
  const [currentRooster, setCurrentRooster] = useState([]);
  useEffect(() => {
    setCurrentRooster(staffData.filter((team) => team.team === currentTeam));
  }, [currentTeam]);
  return (
    <>
      <Grid item xs={12}>
        <StaffItem currentRooster={currentRooster} />
      </Grid>
    </>
  );
}
