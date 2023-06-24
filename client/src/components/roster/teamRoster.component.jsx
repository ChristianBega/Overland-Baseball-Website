import React, { useEffect, useState } from "react";
import { Grid, Paper, Table, TableBody, TableContainer } from "@mui/material";
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
    yearAbbr: "Sr.",
  },
  {
    name: "Niko Gonzales",
    number: "2",
    position: "CF, 2B",
    height: "5`8''",
    weight: "145lbs",
    handed: "R/R",
    year: "Senior",
    yearAbbr: "Sr.",
  },
  {
    name: "Haiden Ortega",
    number: "4",
    position: "OF",
    height: "5`7''",
    weight: "115lbs",
    handed: "R/R",
    year: "Junior",
    yearAbbr: "Jr.",
  },
  {
    name: "Liam Childs",
    number: "8",
    position: "3B, P",
    height: "5`11''",
    weight: "170lbs",
    handed: "R/R",
    year: "Junior",
    yearAbbr: "Jr.",
  },
  {
    name: "Orlando Hurtado-Delgado",
    number: "9",
    position: "OF",
    height: "5`10''",
    weight: "150lbs",
    handed: "R/R",
    year: "Junior",
    yearAbbr: "Jr.",
  },
  {
    name: "Connor Geiss",
    number: "17",
    position: "P, 1B, OF",
    height: "6`3''",
    weight: "135lbs",
    handed: "R/L",
    year: "Senior",
    yearAbbr: "Sr.",
  },
  {
    name: "Tai'Shaun Charleston",
    number: "18",
    position: "OF",
    height: "6`1''",
    weight: "210lbs",
    handed: "R/R",
    year: "Junior",
    yearAbbr: "Jr.",
  },
  {
    name: "Aiden Wynter",
    number: "21",
    position: "1B",
    height: "6`2''",
    weight: "225lbs",
    handed: "R/R",
    year: "Senior",
    yearAbbr: "Sr.",
  },
  {
    name: "Pablo Vielma",
    number: "23",
    position: "2B, SS",
    height: "5`7''",
    weight: "145lbs",
    handed: "R/R",
    year: "Junior",
    yearAbbr: "Jr.",
  },
  {
    name: "Connor Bass",
    number: "27",
    position: "3B, SS, P",
    height: "6`",
    weight: "160lbs",
    handed: "L/R",
    year: "Senior",
    yearAbbr: "Sr.",
  },
  {
    name: "Nathaniel Butler",
    number: "52",
    position: "1B",
    height: "5`9''",
    weight: "235lbs",
    handed: "R/R",
    year: "Junior",
    yearAbbr: "Jr.",
  },

  {
    name: "Preston Lampley",
    number: "n/a",
    position: "2B",
    height: "5`10''",
    weight: "160lbs",
    handed: "R/R",
    year: "Sophomore",
    yearAbbr: "Soph.",
  },

  {
    name: "Scotty Dewey",
    number: "3",
    position: "SS/P",
    height: "6`",
    weight: "215lbs",
    handed: "R/R",
    year: "Sophomore",
    yearAbbr: "Soph.",
  },
  {
    name: "Thompson Antonio",
    number: "n/a",
    position: "OF",
    height: "5`11''",
    weight: "185lbs",
    handed: "R/R",
    year: "Sophomore",
    yearAbbr: "Soph.",
  },
  {
    name: "Weber Jason",
    number: "7",
    position: "OF",
    height: "6`",
    weight: "153lbs",
    handed: "R/R",
    year: "Sophomore",
    yearAbbr: "Soph.",
  },
  {
    name: "Uriel Hernandez",
    number: "13",
    position: "C",
    height: "5`9''",
    weight: "190lbs",
    handed: "R/R",
    year: "Sophomore",
    yearAbbr: "Soph.",
  },

  {
    name: "Matthew Jimenez",
    number: "10",
    position: "2B",
    height: "5`9''",
    weight: "115lbs",
    handed: "R/R",
    year: "Freshman",
    yearAbbr: "Fr.",
  },

  {
    name: "Spencer Brill",
    number: "1",
    position: "Utility",
    height: "5`7''",
    weight: "115lbs",
    handed: "R/R",
    year: "Freshman",
    yearAbbr: "Fr.",
  },
];
export default function TeamRoster({ currentTeam }) {
  const [currentRoster, setCurrentRoster] = useState([]);

  useEffect(() => {
    if (currentTeam === "varsity") {
      setCurrentRoster(varsityRoster);
    } else if (currentTeam === "juniorVarsity") {
      // setCurrentRoster(juniorVarsityRoster);
    } else {
      // setCurrentRoster(freshmanRoster);
    }
  }, [currentTeam]);

  return (
    <section id="team-rooster-section" style={{ width: "100%", borderBottom: ".5px solid grey", borderTop: ".5px solid grey", margin: "3% 0 3% 0" }}>
      <Grid item xs={12} md={12} sx={{ mt: 4 }}>
        <TableContainer component={Paper} sx={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
          <Table aria-label="roster table">
            <TableBody>
              <TeamRosterItem currentRoster={currentRoster} />
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </section>
  );
}
