import React from "react";
import { Grid } from "@mui/material";

// Components
import Staff from "../components/rooster/staff.component";
import Toggles from "../components/rooster/toggles.component";

export default function RoosterPage() {
  return (
    <>
      <section id="home-section" style={{ display: "flex", justifyContent: " center" }}>
        <Grid container maxWidth="xl" spacing={{ xs: 2, md: 4 }}>
          <Staff />
          <Toggles />
        </Grid>
      </section>
    </>
  );
}
