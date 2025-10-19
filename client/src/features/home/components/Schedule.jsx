import { useTheme } from "@emotion/react";
import React, { useMemo } from "react";
// MUI
import { Grid, Typography, Box } from "@mui/material";
// Components
import SectionLayout from "../../ui/components/SectionLayout";
import SectionHeader from "../../ui/components/SectionHeader";
import ScheduleSlider from "./ScheduleSlider";
import { StyledSectionLayoutWrapper } from "../../ui/components/SectionLayout.styles";
// Hooks
import { useStrapiCollection } from "../../../hooks/useStrapiCollection";

export default function Schedule() {
  const theme = useTheme();
  const { data, loading, error } = useStrapiCollection("schedules");
  const isPastEvent = (endDateTime) => new Date(endDateTime) < new Date();
  const sortedData = useMemo(() => {
    if (!data) return [];
    const dataWithPastFlag = data.map((item) => ({
      ...item,
      isPast: isPastEvent(item.endDateTime),
    }));
    return dataWithPastFlag;
  }, [data]);

  if (loading) {
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
      <StyledSectionLayoutWrapper id="schedule-section" aria-label="Schedule Section">
        <SectionHeader
          title="Upcoming Games"
          subtitle="2025-2026 Season"
          color={theme.palette.secondary.main}
          textAlign="center"
          justifyContent="center"
          sx={{ mb: 4 }}
        />

        <ScheduleSlider games={sortedData} showNavigation={true} />
      </StyledSectionLayoutWrapper>
    </Grid>
  );
}
