import { useTheme } from "@emotion/react";
import { Container, Grid, useMediaQuery } from "@mui/material";
import React from "react";

// Components
import Events from "../components/events/eventsDataGrid.component";
import Fundraisers from "../components/events/fundraisers.component";
import Tryouts from "../components/events/tryouts.component";
import TryoutsSlider from "../components/events/tryoutsSlider.component";
// import Workouts from "../components/events/workouts.component";
import YouthProgram from "../components/events/youthProgram.component";
import YouthProgramSlider from "../components/events/youthProgramSlider.component";

export default function EventsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Container component="section" id="events-section" sx={{ display: "flex", justifyContent: " center" }}>
      <Grid id="events-main-grid" container maxWidth="lg" spacing={{ xs: 2, md: 4 }} my={10}>
        <Events />
        {/* <Workouts /> */}
        <YouthProgram />
        <YouthProgramSlider />
        {!isMobile && <TryoutsSlider />}
        <Tryouts />
        {isMobile && <TryoutsSlider />}
        <Fundraisers />
      </Grid>
    </Container>
  );
}
