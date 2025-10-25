import React from "react";
import Grid from "@mui/material/Grid/Grid";
import { Typography } from "@mui/material";

import SectionLayout from "../../../features/ui/components/SectionLayout";
import EventList from "../../home/components/EventList";
import SectionHeader from "../../ui/components/SectionHeader";
import { useTheme } from "@emotion/react";
import NoDataDisplay from "../../ui/components/NoDataDisplay";

export default function Fundraisers({ fundraiserEvents }) {
  const theme = useTheme();
  return (
    <Grid id="fundraiser-and-events" item xs={12}>
      <SectionLayout id="fundraiser-and-events-section" aria-label="Fundraiser and Events Section" marginBlock={true}>
        <SectionHeader title="Upcoming Fundraisers" subtitle="Support Your Overland Trailblazers" color={theme.palette.secondary.main} />
        {fundraiserEvents.length > 0 ? (
          <EventList events={fundraiserEvents} />
        ) : (
          <NoDataDisplay title="No Fundraisers Available" message="Check back soon for updates!" />
        )}
      </SectionLayout>
    </Grid>
  );
}
