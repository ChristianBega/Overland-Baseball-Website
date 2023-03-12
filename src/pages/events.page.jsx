import { Grid } from "@mui/material";
import React from "react";
import Events from "../components/events/events.component";
import Fundraisers from "../components/events/fundraisers.component";
import Tryouts from "../components/events/tryouts.component";
import Workouts from "../components/events/workouts.component";

export default function EventsPage() {
  return (
    <section id="events-section" style={{ display: "flex", justifyContent: " center" }}>
      <Grid container maxWidth="lg" spacing={{ xs: 2, md: 4 }}>
        <Events />
        <Tryouts />
        <Workouts />
        <Fundraisers />
      </Grid>
    </section>
  );
}
