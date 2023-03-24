import React, { useEffect, useState } from "react";
import { Grid, TableContainer } from "@mui/material";
// Components
import TeamRosterItem from "./teamRosterItem.component";

// const roosterData = [];

const varsityRoster = [
  {
    name: "Ahmed Robie",
    number: "0",
    position: "Utility",
    height: "5`10''",
    weight: "160lbs",
    handed: "R/R",
    year: "Senior",
  },
  {
    name: "Niko Gonzales",
    number: "2",
    position: "CF, 2B",
    height: "5`8''",
    weight: "145lbs",
    handed: "R/R",
    year: "Senior",
  },
  {
    name: "Haiden Ortega",
    number: "4",
    position: "OF",
    height: "5`7''",
    weight: "115lbs",
    handed: "R/R",
    year: "Junior",
  },
  {
    name: "Liam Childs",
    number: "8",
    position: "3B, P",
    height: "5`11''",
    weight: "170lbs",
    handed: "R/R",
    year: "Junior",
  },
  {
    name: "Orlando Hurtado-Delgado",
    number: "9",
    position: "OF",
    height: "5`10''",
    weight: "150lbs",
    handed: "R/R",
    year: "Junior",
  },
  {
    name: "Connor Geiss",
    number: "17",
    position: "P, 1B, OF",
    height: "6`3''",
    weight: "135lbs",
    handed: "R/L",
    year: "Senior",
  },

  {
    name: "Tai'Shaun Charleston",
    number: "18",
    position: "OF",
    height: "6`1''",
    weight: "210lbs",
    handed: "R/R",
    year: "Junior",
  },
  {
    name: "Aiden Wynter",
    number: "21",
    position: "1B",
    height: "6`2''",
    weight: "225lbs",
    handed: "R/R",
    year: "Senior",
  },
  {
    name: "Pablo Vielma",
    number: "23",
    position: "2B, SS",
    height: "5`7''",
    weight: "145lbs",
    handed: "R/R",
    year: "Junior",
  },
  {
    name: "Connor Bass",
    number: "27",
    position: "3B, SS, P",
    height: "6`0''",
    weight: "160lbs",
    handed: "L/R",
    year: "Senior",
  },
  {
    name: "Nathaniel Butler",
    number: "52",
    position: "1B",
    height: "5`9''",
    weight: "235lbs",
    handed: "R/R",
    year: "Junior",
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
    <section id="team-rooster-section" style={{ width: "100%", borderBottom: ".5px solid grey", borderTop: ".5px solid grey", margin: "3% 0 3% 0" }}>
      <Grid item xs={12} md={12} sx={{ mt: 4 }}>
      <TableContainer sx={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
        <TeamRosterItem currentRoster={currentRoster} />
      </TableContainer>
      </Grid>
    </section>
  );
}
