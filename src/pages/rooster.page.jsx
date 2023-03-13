import React, { useState } from "react";
import { Grid } from "@mui/material";

// Components
import Staff from "../components/rooster/staff.component";
import Toggles from "../components/rooster/toggles.component";
import TeamRooster from "../components/rooster/teamRooster.component";

export default function RoosterPage() {
  const [currentTeam, setCurrentTeam] = useState("varsity");
  return (
    <>
      <section id="rooster-section" style={{ display: "flex", justifyContent: " center" }}>
        <Grid container maxWidth="lg" >
          <Staff currentTeam={currentTeam} />
          <Toggles setCurrentTeam={setCurrentTeam} />
          <TeamRooster currentTeam={currentTeam} />
        </Grid>
      </section>
    </>
  );
}
