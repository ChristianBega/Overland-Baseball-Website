import { useTheme } from "@emotion/react";
import React, { useMemo } from "react";
// MUI
import { Grid } from "@mui/material";
// Components
import SectionHeader from "../../ui/components/SectionHeader";
import ScheduleSlider from "./ScheduleSlider";
import { StyledSectionLayoutWrapper } from "../../ui/components/SectionLayout.styles";
// Hooks
import { useStrapiCollection } from "../../../hooks/useStrapiCollection";
import DataStateDisplay from "../../ui/components/DataStateDisplay";

export default function Schedule() {
  const theme = useTheme();
  const { data, loading, error, refetch } = useStrapiCollection("schedules");

  const isPastEvent = (endDateTime) => new Date(endDateTime) < new Date();

  const sortedData = useMemo(() => {
    if (!data) return [];
    const dataWithPastFlag = data.map((item) => ({
      ...item,
      isPast: isPastEvent(item.endDateTime),
    }));
    return dataWithPastFlag;
  }, [data]);

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

        <DataStateDisplay
          isLoading={loading}
          isError={!!error}
          error={error}
          isEmpty={!sortedData || sortedData.length === 0}
          onRetry={refetch}
          loadingMessage="Loading schedule..."
          errorTitle="Unable to Load Schedule"
          emptyProps={{
            title: "No Games Available",
            message: "Check back soon for updates!",
          }}
        >
          <ScheduleSlider games={sortedData} showNavigation={true} />
        </DataStateDisplay>
      </StyledSectionLayoutWrapper>
    </Grid>
  );
}
