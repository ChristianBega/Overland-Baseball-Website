import React, { useState } from "react";
import { Container, Grid } from "@mui/material";

// Components
import Staff from "../components/roster/staff.component";
// import Toggles from "../components/roster/toggles.component";
import TeamRoster from "../components/roster/teamRoster.component";

export default function RosterPage() {
  // setCurrentTeam - prop used to track the currentTeams state when toggles are active.
  const [currentTeam] = useState("varsity");
  return (
    <>
      <Container component="section" id="rooster-section" style={{ display: "flex", justifyContent: " center" }}>
        <Grid container maxWidth="lg" mt={10}>
          <Staff currentTeam={currentTeam} />
          {/* <Toggles setCurrentTeam={setCurrentTeam} /> */}
          <TeamRoster currentTeam={currentTeam} />
        </Grid>
      </Container>
    </>
  );
}
