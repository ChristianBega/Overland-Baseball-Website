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
import { DataStateDisplay } from "../../ui";

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
  const { data, loading, error, refetch } = useStrapiCollection("events", { filters: { gameType: "Featured" } });

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

        <DataStateDisplay
          isLoading={loading}
          isError={!!error}
          error={error}
          isEmpty={!data || data.length === 0}
          onRetry={refetch}
          loadingMessage="Loading events..."
          errorTitle="Unable to Load Events"
          emptyProps={{
            title: "No Featured Events",
            message: "Explore all upcoming events below!",
          }}
        >
          <EventList events={data} eventsStrapi={data} />
        </DataStateDisplay>

        {!isMd && <ExploreAllEventsButton marginTop={4} />}
      </SectionLayout>
    </Grid>
  );
};

export default Events;
