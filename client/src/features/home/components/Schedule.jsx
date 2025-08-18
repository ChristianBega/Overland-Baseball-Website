import { useTheme } from "@emotion/react";
import React, { useMemo } from "react";
// MUI
import { Grid, Typography, Box } from "@mui/material";
// Components
import SectionLayout from "../../ui/components/SectionLayout";
import SectionHeader from "../../ui/components/SectionHeader";
import ScheduleSlider from "./ScheduleSlider";
import { StyledScheduleSectionLayout } from "./Schedule.styles";
// Hooks
import { useRealtimeData } from "../../../hooks/useRealtimeData";

export default function Schedule() {
  const theme = useTheme();
  const { data, isLoading, error } = useRealtimeData("schedule");

  const sortedData = useMemo(() => {
    if (!data) return [];

    const now = new Date();

    // Create a new array with the isPast property added to each item
    const dataWithPastFlag = data.map((item) => {
      const itemDate = new Date(item.date);
      return {
        ...item,
        isPast: itemDate < now,
      };
    });

    // Separate past and future events
    const pastEvents = dataWithPastFlag.filter((item) => item.isPast);
    const futureEvents = dataWithPastFlag.filter((item) => !item.isPast);

    // Sort each group chronologically
    pastEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
    futureEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Combine with future events first, then past events
    return [...futureEvents, ...pastEvents];
  }, [data]);

  const handleGameClick = (gameData) => {
    const { date, opponent, location } = gameData;
    // time,
    const calendarUrl = `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(
      `Overland vs ${opponent}`
    )}&dates=${date}&details=${encodeURIComponent(`Baseball game against ${opponent}`)}&location=${encodeURIComponent(location)}`;
    window.open(calendarUrl, "_blank");
  };

  if (isLoading) {
    return (
      <Grid item xs={12}>
        <SectionLayout id="schedule-section" aria-label="Schedule Section">
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <Typography>Loading schedule...</Typography>
          </Box>
        </SectionLayout>
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid item xs={12}>
        <SectionLayout id="schedule-section" aria-label="Schedule Section">
          <Box textAlign="center" py={4}>
            <Typography variant="h6" color="error">
              {error ? "Error with real-time updates" : "Error fetching/caching the data"}
            </Typography>
          </Box>
        </SectionLayout>
      </Grid>
    );
  }

  return (
    <Grid item xs={12}>
      <StyledScheduleSectionLayout id="schedule-section" aria-label="Schedule Section">
        <SectionHeader
          title="Upcoming Games"
          subtitle="2025-2026 Season"
          color={theme.palette.secondary.main}
          textAlign="center"
          justifyContent="center"
          sx={{ mb: 4 }}
        />

        <ScheduleSlider games={sortedData} onGameClick={handleGameClick} showNavigation={true} />
      </StyledScheduleSectionLayout>
    </Grid>
  );
}
