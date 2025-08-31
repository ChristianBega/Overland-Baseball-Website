import { Container, Grid } from "@mui/material";
import React from "react";

import EventsView from "../components/EventView";
import PlayerEventView from "../components/PlayerEventView";

import useMediaQueries from "../../../utils/helpers/useMediaQueries.utils";
import { useRealtimeData } from "../../../hooks/useRealtimeData";
import Fundraisers from "../components/Fundraisers";
import { Navigation } from "../../navigation";
export default function EventsPage() {
  const { isLg } = useMediaQueries();
  const { data, isLoading, error } = useRealtimeData("events");
  const playerEvents = data?.filter((event) => event.eventType === "player");
  const fundraiserEvents = data?.filter((event) => event.eventType === "fundraiser");

  if (isLoading) return "loading...";
  if (error) return "error...";
  return (
    <>
      <Navigation />
      <Container id="events-page" component="main" aria-label="Events Page">
        <Grid container id="events-main-grid" columnSpacing={isLg ? 6 : 4}>
          <EventsView />
          <PlayerEventView playerEvents={playerEvents} />
          <Fundraisers fundraiserEvents={fundraiserEvents} />
        </Grid>
      </Container>
    </>
  );
}
