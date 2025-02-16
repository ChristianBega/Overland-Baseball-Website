import React from "react";
import { useTheme } from "@emotion/react";
// MUI
import { Grid, Typography } from "@mui/material";
//  Components
import SectionLayout from "../../../../../components/reusableComponents/sectionLayout/sectionLayout.component";
// Utilities
import findKeyWordsAndHighlight from "../../../../../setup/utils/helpers/findKeyWordsAndHighLight";
// Data
import cardMockData from "../../../../../websiteData/events/events.data.json";
// Assets
import cardImgOne from "../../../../../assets/homePage/events/card-img-1.svg";
import cardImgTwo from "../../../../../assets/homePage/events/card-img-2.svg";
import cardImgThree from "../../../../../assets/homePage/events/card-img-3.svg";
import cardImgFour from "../../../../../assets/homePage/events/card-img-4.svg";

import useMediaQueries from "../../../../../setup/utils/helpers/useMediaQueries.utils";
import BentoLayout from "../../../../../components/reusableComponents/bentoLayout/bentoLayout.component";

// ! lines 20-31 are temp for mockData... Once we move to DB eventImageUrl will be required instead of the temp image solution below
const images = {
  cardImgOne,
  cardImgTwo,
  cardImgThree,
  cardImgFour,
};

const events = cardMockData.map((event) => ({
  ...event,
  image: images[event.image] || event.image,
}));
// ! lines 20-31 are temp for mockData... Once we move to DB eventImageUrl will be required instead of the temp image solution below

const Events = () => {
  const { isMd } = useMediaQueries();
  const theme = useTheme();

  // const { data, isLoading, error } = useRealtimeData("events");
  // if (isLoading) return "loading...";
  // if (error) return "error...";

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
        {/* <BentoLayout gridItemsData={events} /> */}
      </SectionLayout>
    </Grid>
  );
};

export default Events;
