import React from "react";
import Grid from "@mui/material/Grid/Grid";

import SectionLayout from "../../../features/ui/components/SectionLayout";
import EventList from "../../home/components/EventList";
import SectionHeader from "../../ui/components/SectionHeader";
import { useTheme } from "@emotion/react";
import { DataStateDisplay } from "../../ui";
import { useStrapiCollection } from "../../../hooks/useStrapiCollection";

export default function Fundraisers() {
  const theme = useTheme();
  const { data: fundraiserEvents, loading, error, refetch } = useStrapiCollection("events", { filters: { gameType: "Fundraiser" } });

  return (
    <Grid id="fundraiser-and-events" item xs={12}>
      <SectionLayout id="fundraiser-and-events-section" aria-label="Fundraiser and Events Section" marginBlock={true}>
        <SectionHeader title="Upcoming Fundraisers" subtitle="Support Your Overland Trailblazers" color={theme.palette.secondary.main} />

        <DataStateDisplay
          isLoading={loading}
          isError={!!error}
          error={error}
          isEmpty={!fundraiserEvents || fundraiserEvents.length === 0}
          onRetry={refetch}
          loadingMessage="Loading fundraisers..."
          errorTitle="Unable to Load Fundraisers"
          emptyProps={{
            title: "No Fundraisers Available",
            message: "Check back soon for fundraising opportunities!",
          }}
        >
          <EventList events={fundraiserEvents} />
        </DataStateDisplay>
      </SectionLayout>
    </Grid>
  );
}
