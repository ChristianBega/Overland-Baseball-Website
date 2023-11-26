import React, { useEffect, useState } from "react";
import { Grid, Paper, Table, TableBody, TableContainer } from "@mui/material";
// Components
import TeamRosterItem from "../teamRosterItem/teamRosterItem.component";
// const roosterData = [];
import { varsityRoster } from "../../../../../websiteData/roster.data";

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
    <section id="team-rooster-section" style={{ width: "100%" }}>
      <Grid item xs={12} md={12} sx={{ mt: 4 }}>
        <TableContainer component={Paper} sx={{ display: "flex", justifyContent: "center", flexDirection: "column", paddingBlock: ".5rem" }}>
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
