import { Grid, Typography } from "@mui/material";
import React from "react";
import SectionLayout from "../../../../components/reusableComponents/sectionLayout/sectionLayout.component";
import EventCalendar from "./eventCalendar";
import { useRealtimeData } from "../../../../hooks/useRealtimeData";

export default function Events() {
  const { data, isLoading, error } = useRealtimeData("events");

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
        <Typography typography="h1" component="h1" gutterBottom>
          Events
        </Typography>
        <EventCalendar events={data} onEventClick={handleEventClick} />
      </SectionLayout>
    </Grid>
  );
}
