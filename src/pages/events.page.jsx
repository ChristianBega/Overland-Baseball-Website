import { Grid } from "@mui/material";
import React from "react";
import Events from "../components/events/events.component";

export default function EventsPage() {
  return (
    <section id="events-section" style={{ display: "flex", justifyContent: " center" }}>
      <Grid container maxWidth="xl" spacing={{ xs: 2, md: 4 }}>
        <Events />
      </Grid>
    </section>
  );
}
