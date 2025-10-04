import { Container, Grid } from "@mui/material";
import React from "react";

import EventsView from "../components/EventView";
import PlayerEventView from "../components/PlayerEventView";

import useMediaQueries from "../../../utils/helpers/useMediaQueries.utils";
import Fundraisers from "../components/Fundraisers";
import { Navigation } from "../../navigation";
import { useStrapiCollection } from "../../../hooks/useStrapiCollection";
export default function EventsPage() {
  const { isLg } = useMediaQueries();
  const {
    data: playerEvents,
    loading: playerEventsLoading,
    error: playerEventsError,
  } = useStrapiCollection("events", { filters: { gameType: "Player" } });
  const {
    data: fundraiserEvents,
    loading: fundraiserEventsLoading,
    error: fundraiserEventsError,
  } = useStrapiCollection("events", { filters: { gameType: "Fundraiser" } });

  if (playerEventsLoading || fundraiserEventsLoading) return "loading...";
  if (playerEventsError || fundraiserEventsError) return "error...";
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
