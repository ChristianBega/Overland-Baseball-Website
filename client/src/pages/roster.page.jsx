import React, { useState } from "react";
import { Grid } from "@mui/material";

// Components
import Staff from "../components/roster/staff.component";
import Toggles from "../components/roster/toggles.component";
import TeamRoster from "../components/roster/teamRoster.component";

export default function RosterPage() {
  const [currentTeam, setCurrentTeam] = useState("varsity");
  return (
    <>
      <section id="rooster-section" style={{ display: "flex", justifyContent: " center" }}>
        <Grid container maxWidth="lg">
          <Staff currentTeam={currentTeam} />
          <Toggles setCurrentTeam={setCurrentTeam} />
          <TeamRoster currentTeam={currentTeam} />
        </Grid>
      </section>
    </>
  );
}
