import React from "react";
import { useTheme } from "@emotion/react";
// MUI
import { Grid, Typography } from "@mui/material";
//  Components
import SectionLayout from "../../../../../components/reusableComponents/sectionLayout/sectionLayout.component";
import BentoLayout from "../../../../../components/reusableComponents/bentoLayout/bentoLayout.component";
// Utilities
import findKeyWordsAndHighlight from "../../../../../setup/utils/helpers/findKeyWordsAndHighLight";
import { useRealtimeData } from "../../../../../hooks/useRealtimeData";
import useMediaQueries from "../../../../../setup/utils/helpers/useMediaQueries.utils";

const Events = () => {
  const { isMd } = useMediaQueries();
  const theme = useTheme();
  const { data, isLoading, error } = useRealtimeData("events");
  const featuredEvents = data?.filter((event) => event.eventType === "featured");

  if (isLoading) return "loading...";
  if (error) return "error...";

  const eventInfoPageData = {
    text: "Help support your Overland Trailblazer baseball program by attending our upcoming events. We have lots happening in our community including fundraisers, team activities, and more. Check out all our events here and sign up!",
    keywords: [{ keyword: "all our events here and sign up!", url: "/events", type: "RouterLink" }],
    options: { color: theme.palette.secondary.main },
  };

  const highlightedText = findKeyWordsAndHighlight(eventInfoPageData.text, eventInfoPageData.keywords, eventInfoPageData.options);
  return (
    <Grid item xs={12} sx={{ minHeight: { md: "815px", lg: "745px" } }}>
      <SectionLayout id="events-section" aria-label="Events Section">
        <Typography typography="h2" component="h2">
          Events
        </Typography>
        <Typography component="p" typography="p" marginBottom={isMd ? 4 : 2}>
          {highlightedText}
        </Typography>
        <BentoLayout gridItemsData={featuredEvents} />
      </SectionLayout>
    </Grid>
  );
};

export default Events;
