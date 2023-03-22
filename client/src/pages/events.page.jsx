import { Grid } from "@mui/material";
import React from "react";

// Components
import Events from "../components/events/events.component";
import Fundraisers from "../components/events/fundraisers.component";
import Tryouts from "../components/events/tryouts.component";
import Workouts from "../components/events/workouts.component";

export default function EventsPage() {
  return (
    <section id="events-section" style={{ display: "flex", justifyContent: " center" }}>
      <Grid id="events-main-grid" container maxWidth="lg" spacing={{ xs: 2, md: 4 }}>
        <Events />
        {/* <EventInfo setCurrentSeason={setCurrentSeason} currentSeason={currentSeason} /> */}
        <Workouts />
        <Tryouts />
        <Fundraisers />
      </Grid>
    </section>
  );
}
