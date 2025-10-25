import React from "react";
import { useTheme } from "@emotion/react";
// MUI
import { Button, Grid } from "@mui/material";
//  Components
import SectionLayout from "../../ui/components/SectionLayout";
// Utilities
import useMediaQueries from "../../../utils/helpers/useMediaQueries.utils";
import SectionHeader from "../../ui/components/SectionHeader";
import EventList from "./EventList";
import ButtonBlock from "../../ui/components/ButtonBlock";
import { Link } from "react-router-dom";
import { useStrapiCollection } from "../../../hooks/useStrapiCollection";
import NoDataDisplay from "../../ui/components/NoDataDisplay";

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
  const { data, loading, error } = useStrapiCollection("events", { filters: { gameType: "Featured" } });

  // TODO: add loading and error components
  if (loading) return "loading...";
  if (error) return { error };

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

        {data.length > 0 ? (
          <EventList events={data} eventsStrapi={data} />
        ) : (
          <NoDataDisplay title="No Events Available" message="Check back soon for updates!" />
        )}
        {!isMd && <ExploreAllEventsButton marginTop={4} />}
      </SectionLayout>
    </Grid>
  );
};

export default Events;
