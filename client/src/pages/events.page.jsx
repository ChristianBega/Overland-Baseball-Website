import { useTheme } from "@emotion/react";
import { Container, Grid, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { containerVariants } from "../components/framerMotion/transitions";
// Components
import Events from "../components/events/eventsDataGrid.component";
import Fundraisers from "../components/events/fundraisers.component";
import Tryouts from "../components/events/tryouts.component";
import TryoutsSlider from "../components/events/tryoutsSlider.component";
// import Workouts from "../components/events/workouts.component";
import YouthProgram from "../components/events/youthProgram.component";
import YouthProgramSlider from "../components/events/youthProgramSlider.component";
import Workouts from "../components/events/workouts.component";
import WorkoutSlider from "../components/events/workoutSlider.component";

export default function EventsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);
  return (
    <Container
      component={motion.section}
      initial={containerVariants.hidden}
      animate={containerVariants.visible}
      exit={containerVariants.exit}
      transition={containerVariants.transition}
      id="events-section"
      sx={{ display: "flex", justifyContent: " center" }}
    >
      <Grid id="events-main-grid" container maxWidth="lg" rowSpacing={isMobile ? 12 : 32}>
        <Events />
        {isMobile && <YouthProgramSlider isMobile={isMobile} />}
        <YouthProgram isMobile={isMobile} />
        {!isMobile && <YouthProgramSlider />}
        <TryoutsSlider isMobile={isMobile} />
        <Tryouts isMobile={isMobile} />
        {isMobile && <WorkoutSlider isMobile={isMobile} />}
        <Workouts isMobile={isMobile} />
        {!isMobile && <WorkoutSlider />}
        <Fundraisers />
      </Grid>
    </Container>
  );
}
