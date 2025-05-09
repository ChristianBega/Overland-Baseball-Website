import { Container, Grid } from "@mui/material";
import React from "react";

import EventsView from "../components/EventView";
import PlayerEvent from "../components/PlayerEvent";

import useMediaQueries from "../../../utils/helpers/useMediaQueries.utils";
import { useRealtimeData } from "../../../hooks/useRealtimeData";
import Fundraisers from "../components/Fundraisers";
export default function EventsPage() {
  const { isLg } = useMediaQueries();
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
      <Grid container id="events-main-grid" columnSpacing={isLg ? 6 : 4}>
        <EventsView />
        {playerEvents.map((event, index) => (
          <PlayerEvent key={event.id} data={event} rowReverse={index % 2 === 0 ? true : false} />
        ))}

        <Fundraisers fundraiserEvents={fundraiserEvents} />
      </Grid>
    </Container>
  );
}
