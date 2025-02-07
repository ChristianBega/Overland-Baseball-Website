import { useTheme } from "@emotion/react";
import { Container, Grid, useMediaQuery } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";
import { containerVariants } from "../../../setup/framerAnimations/transitions";
// Components
import Events from "./components/eventsDataGrid/eventsDataGrid.component";
import Fundraisers from "./components/fundraisers/fundraisers.component";
import Tryouts from "./components/tryouts/tryouts.component";
import TryoutsSlider from "./components/tryoutsSlider/tryoutsSlider.component";
import YouthProgram from "./components/youthProgram/youthProgram.component";
import YouthProgramSlider from "./components/youthProgramSlider/youthProgramSlider.component";
import Workouts from "./components/workouts/workouts.component";
import WorkoutSlider from "./components/workoutSlider/workoutSlider.component";
// Utils & Helpers
import useMediaQueries from "../../../setup/utils/helpers/useMediaQueries.utils";

export default function EventsPage() {
  const theme = useTheme();
  const { isLg, isMd } = useMediaQueries();
  // const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Container
      // component={motion.section}
      // initial={containerVariants.hidden}
      // animate={containerVariants.visible}
      // exit={containerVariants.exit}
      // transition={containerVariants.transition}
      id="events-page"
      component="main"
      aria-label="Events Page"
    >
      {/* maxWidth="lg" rowSpacing={isMobile ? 12 : 32} */}

      <Grid container id="events-main-grid" columnSpacing={isLg ? 6 : 4}>
        <Events />
        {/* {isMobile && <YouthProgramSlider isMobile={isMobile} />}
        <YouthProgram isMobile={isMobile} />
        {!isMobile && <YouthProgramSlider />}
        <TryoutsSlider isMobile={isMobile} />
        <Tryouts isMobile={isMobile} />
        {isMobile && <WorkoutSlider isMobile={isMobile} />}
        <Workouts isMobile={isMobile} />
        {!isMobile && <WorkoutSlider />}
        <Fundraisers /> */}
      </Grid>
    </Container>
  );
}
