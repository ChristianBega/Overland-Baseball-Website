import React, { useState } from "react";
import { Grid } from "@mui/material";

// Components
import Staff from "../components/rooster/staff.component";
import Toggles from "../components/rooster/toggles.component";

export default function RoosterPage() {
  const [currentTeam, setCurrentTeam] = useState("varsity");
  return (
    <>
      <section id="home-section" style={{ display: "flex", justifyContent: " center" }}>
        <Grid container maxWidth="xl" spacing={{ xs: 2, md: 4 }}>
          <Staff currentTeam={currentTeam} />
          <Toggles setCurrentTeam={setCurrentTeam} />
        </Grid>
      </section>
    </>
  );
}
