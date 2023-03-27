import { Container, Grid } from "@mui/material";
import React from "react";

// Components
import Events from "../components/events/eventsDataGrid.component";
import Fundraisers from "../components/events/fundraisers.component";
import Tryouts from "../components/events/tryouts.component";
// import Workouts from "../components/events/workouts.component";
import YouthProgram from "../components/events/youthProgram.component";

export default function EventsPage() {
  return (
    <Container component="section" id="events-section" sx={{ display: "flex", justifyContent: " center" }}>
      <Grid id="events-main-grid" container maxWidth="lg" spacing={{ xs: 2, md: 4 }} my={10}>
        <Events />
        {/* <Workouts /> */}
        <YouthProgram />
        <Tryouts />
        <Fundraisers />
      </Grid>
    </Container>
  );
}
