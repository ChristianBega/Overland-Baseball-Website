import { Grid, Typography } from "@mui/material";
import React from "react";
import SectionLayout from "../../../features/ui/components/SectionLayout";
import EventCalendar from "./EventCalendar";
import { useRealtimeData } from "../../../hooks/useRealtimeData";
import SectionHeader from "../../ui/components/SectionHeader";
import { useTheme } from "@emotion/react";

export default function Events() {
  const { data, isLoading, error } = useRealtimeData("events");
  const theme = useTheme();

  const handleEventClick = (event) => {
    console.log("Event clicked:", event);
  };
  if (isLoading) {
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>Loading...</div>;
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Typography variant="h6" color="error">
          {error ? "Error with real-time updates" : "Error fetching/caching the data"}
        </Typography>
      </div>
    );
  }
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
        <EventCalendar events={data} onEventClick={handleEventClick} />
      </SectionLayout>
    </Grid>
  );
}
