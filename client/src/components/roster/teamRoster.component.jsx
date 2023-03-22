import React, { useEffect, useState } from "react";
import { Grid, TableContainer } from "@mui/material";
// Components
import TeamRosterItem from "./teamRosterItem.component";

// const roosterData = [];

const varsityRoster = [
  {
    name: "Player 1",
    number: "11",
    position: "Catcher",
    year: "Sophomore",
  },
  {
    name: "Player 2",
    number: "23",
    position: "Pitcher",
    year: "Senior",
  },
  {
    name: "Player 3",
    number: "13",
    position: "1st",
    year: "Junior",
  },
  {
    name: "Player 4",
    number: "4",
    position: "2nd",
    year: "Sophomore",
  },
  {
    name: "Player 5",
    number: "1",
    position: "3d",
    year: "Junior",
  },
  {
    name: "Player 6",
    number: "16",
    position: "SS",
    year: "Senior",
  },

  {
    name: "Player 7",
    number: "18",
    position: "LF",
    year: "Junior",
  },
  {
    name: "Player 8",
    number: "21",
    position: "CF",
    year: "Senior",
  },
  {
    name: "Player 1",
    number: "8",
    position: "RF",
    year: "Sophomore",
  },
];
const juniorVarsityRoster = [
  {
    name: "Player 1",
    number: "99",
    position: "Catcher",
    year: "Freshman",
  },
  {
    name: "Player 2",
    number: "55",
    position: "Pitcher",
    year: "Junior",
  },
  {
    name: "Player 3",
    number: "21",
    position: "1st",
    year: "Junior",
  },
  {
    name: "Player 4",
    number: "8",
    position: "2nd",
    year: "Freshman",
  },
  {
    name: "Player 5",
    number: "11",
    position: "3d",
    year: "Junior",
  },
  {
    name: "Player 6",
    number: "18",
    position: "SS",
    year: "Junior",
  },

  {
    name: "Player 7",
    number: "3",
    position: "LF",
    year: "Junior",
  },
  {
    name: "Player 8",
    number: "31",
    position: "CF",
    year: "Junior",
  },
  {
    name: "Player 1",
    number: "1",
    position: "RF",
    year: "Sophomore",
  },
];
const freshmanRoster = [
  {
    name: "Player 1",
    number: "11",
    position: "Catcher",
    year: "Freshman",
  },
  {
    name: "Player 2",
    number: "13",
    position: "Pitcher",
    year: "Freshman",
  },
  {
    name: "Player 3",
    number: "10",
    position: "1st",
    year: "Freshman",
  },
  {
    name: "Player 4",
    number: "4",
    position: "2nd",
    year: "Sophomore",
  },
  {
    name: "Player 5",
    number: "16",
    position: "3d",
    year: "Sophomore",
  },
  {
    name: "Player 6",
    number: "16",
    position: "SS",
    year: "Freshman",
  },

  {
    name: "Player 7",
    number: "19",
    position: "LF",
    year: "Freshman",
  },
  {
    name: "Player 8",
    number: "11",
    position: "CF",
    year: "Freshman",
  },
  {
    name: "Player 1",
    number: "33",
    position: "RF",
    year: "Sophomore",
  },
];
export default function TeamRoster({ currentTeam }) {
  const [currentRoster, setCurrentRoster] = useState([]);

  useEffect(() => {
    if (currentTeam === "varsity") {
      setCurrentRoster(varsityRoster);
    } else if (currentTeam === "juniorVarsity") {
      setCurrentRoster(juniorVarsityRoster);
    } else {
      setCurrentRoster(freshmanRoster);
    }
  }, [currentTeam]);

  return (
    <section id="team-rooster-section" style={{ display: "flex", justifyContent: " center", width: "100%" }}>
      <Grid item xs={12} md={10} sx={{ mt: 4 }}>
      <TableContainer sx={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
        <TeamRosterItem currentRoster={currentRoster} />
      </TableContainer>
      </Grid>
    </section>
  );
}
