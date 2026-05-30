import { Grid } from "@mui/material";
import React from "react";
import SectionLayout from "../../../features/ui/components/SectionLayout";
import EventCalendar from "./EventCalendar";
import SectionHeader from "../../ui/components/SectionHeader";
import { useTheme } from "@emotion/react";
import { useStrapiCollection } from "../../../hooks/useStrapiCollection";
import { DataStateDisplay } from "../../ui";

export default function Events() {
  const { data: events, loading: eventsLoading, error: eventsError, refetch: refetchEvents } = useStrapiCollection("events");
  const { data: schedules, loading: schedulesLoading, error: schedulesError, refetch: refetchSchedules } = useStrapiCollection("schedules");

  const theme = useTheme();

  // Combined states for all-or-nothing approach
  const loading = eventsLoading || schedulesLoading;
  const error = eventsError || schedulesError;
  const combinedData = [...(events || []), ...(schedules || [])];

  const handleRetry = () => {
    if (eventsError) refetchEvents();
    if (schedulesError) refetchSchedules();
  };

  return (
    <Grid item xs={12}>
      <SectionLayout id="events-section" aria-label="Events Section">
        <SectionHeader
          titleProps={{ component: "h1", variant: "h1" }}
          title="All Events"
          subtitle="Don't Miss Out on Our Events"
          color={theme.palette.secondary.main}
          sx={{ mb: 3 }}
        />

        <DataStateDisplay
          isLoading={loading}
          isError={!!error}
          error={error}
          isEmpty={combinedData.length === 0}
          onRetry={handleRetry}
          loadingMessage="Loading calendar..."
          errorTitle="Unable to Load Calendar"
          emptyProps={{
            title: "No Events Scheduled",
            message: "Check back soon for the season schedule!",
          }}
        >
          <EventCalendar events={combinedData} />
        </DataStateDisplay>
      </SectionLayout>
    </Grid>
  );
}
