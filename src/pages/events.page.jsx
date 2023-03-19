import { Grid } from "@mui/material";
import React, { useState } from "react";
import EventInfo from "../components/events/eventInfo.component";
import Events from "../components/events/events.component";
import Fundraisers from "../components/events/fundraisers.component";

export default function EventsPage() {
  const [currentSeason, setCurrentSeason] = useState("spring");

  return (
    <section id="events-section" style={{ display: "flex", justifyContent: " center" }}>
      <Grid id="events-main-grid" container maxWidth="lg" spacing={{ xs: 2, md: 4 }}>
        <Events />
        <EventInfo setCurrentSeason={setCurrentSeason} currentSeason={currentSeason} />
        <Fundraisers />
      </Grid>
    </section>
  );
}
