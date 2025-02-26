// import { useTheme } from "@emotion/react";
import { Container, Grid } from "@mui/material";
import React from "react";
// import { motion } from "framer-motion";
// import { containerVariants } from "../../../setup/framerAnimations/transitions";
// Components
import EventsView from "./components/eventsView/eventsView";
import PlayerEvent from "./components/playerEvent/playerEvent.component";
// import Fundraisers from "./components/fundraisers/fundraisers.component";
// import Tryouts from "./components/tryouts/tryouts.component";
// import TryoutsSlider from "./components/tryoutsSlider/tryoutsSlider.component";
// import YouthProgramSlider from "./components/youthProgramSlider/youthProgramSlider.component";
// import Workouts from "./components/workouts/workouts.component";
// import WorkoutSlider from "./components/workoutSlider/workoutSlider.component";
// Utils & Helpers
import useMediaQueries from "../../../setup/utils/helpers/useMediaQueries.utils";
import BentoLayout from "../../../components/reusableComponents/bentoLayout/bentoLayout.component";
import { useRealtimeData } from "../../../hooks/useRealtimeData";
import Fundraisers from "./components/fundraisers/fundraisers.component";
export default function EventsPage() {
  // const theme = useTheme();
  const { isLg } = useMediaQueries();
  // const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { data, isLoading, error } = useRealtimeData("events");
  const playerEvents = data?.filter((event) => event.eventType === "player");
  const fundraiserEvents = data?.filter((event) => event.eventType === "fundraiser");

  if (isLoading) return "loading...";
  if (error) return "error...";
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
        <EventsView />
        {playerEvents.map((event, index) => (
          <PlayerEvent key={event.id} data={event} rowReverse={index % 2 === 0 ? true : false} />
        ))}
        {/* <PlayerEvent playerEventType="youth program" />
        <PlayerEvent playerEventType="work outs" rowReverse />
        <PlayerEvent playerEventType="try outs" /> */}
        {/* {isMobile && <YouthProgramSlider isMobile={isMobile} />}
        <YouthProgram isMobile={isMobile} />
        {!isMobile && <YouthProgramSlider />}
        <TryoutsSlider isMobile={isMobile} />
        <Tryouts isMobile={isMobile} />
        {isMobile && <WorkoutSlider isMobile={isMobile} />}

        <Workouts isMobile={isMobile} />
        {!isMobile && <WorkoutSlider />}
        <Fundraisers fundraiserEvents={fundraiserEvents} /> */}
        <Fundraisers fundraiserEvents={fundraiserEvents} />
      </Grid>
    </Container>
  );
}
