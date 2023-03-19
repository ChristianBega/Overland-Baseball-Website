import { Grid } from "@mui/material";
import React, { useState } from "react";
import EventInfo from "../components/events/eventInfo.component";
import Events from "../components/events/events.component";
import Fundraisers from "../components/events/fundraisers.component";

export default function EventsPage() {
  // console.log("events main page ",currentSeason);

  return (
    <section id="events-section" style={{ display: "flex", justifyContent: " center" }}>
      <Grid id="events-main-grid" container maxWidth="lg" spacing={{ xs: 2, md: 4 }}>
        <Events />
        <EventInfo  />
        <Fundraisers />
      </Grid>
    </section>
  );
}
// setCurrentSeason={setCurrentSeason} currentSeason={currentSeason}