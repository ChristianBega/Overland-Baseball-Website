import React from "react";
import { useTheme } from "@emotion/react";
// MUI
import { Button, Grid } from "@mui/material";
//  Components
import SectionLayout from "../../ui/components/SectionLayout";
// Utilities
import { useRealtimeData } from "../../../hooks/useRealtimeData";
import useMediaQueries from "../../../utils/helpers/useMediaQueries.utils";
import SectionHeader from "../../ui/components/SectionHeader";
import EventList from "./EventList";
import ButtonBlock from "../../ui/components/ButtonBlock";
import { Link } from "react-router-dom";

const ExploreAllEventsButton = ({ marginTop }) => {
  return (
    <ButtonBlock marginTop={marginTop}>
      <Button component={Link} to="/events" variant="contained" color="secondary">
        Explore All Events
      </Button>
    </ButtonBlock>
  );
};

const Events = () => {
  const { isMd } = useMediaQueries();
  const theme = useTheme();
  const { data, isLoading, error } = useRealtimeData("events");
  const featuredEvents = data?.filter((event) => event.eventType === "featured");

  // TODO: add loading and error components
  if (isLoading) return "loading...";
  if (error) return "error...";

  return (
    // todo: remove inline css to styled component
    <Grid item xs={12} sx={{ minHeight: { md: "815px", lg: "745px" } }}>
      <SectionLayout id="events-section" aria-label="Events Section">
        <SectionHeader
          title="Upcoming Events"
          subtitle="Support Your Overland Trailblazers"
          color={theme.palette.secondary.main}
          cta={isMd && <ExploreAllEventsButton marginTop={0} />}
        />

        <EventList events={featuredEvents} />
        {!isMd && <ExploreAllEventsButton marginTop={4} />}
      </SectionLayout>
    </Grid>
  );
};

export default Events;
