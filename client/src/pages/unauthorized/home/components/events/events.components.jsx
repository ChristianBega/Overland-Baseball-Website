import React from "react";
import { useTheme } from "@emotion/react";
// MUI
import { Grid, Typography } from "@mui/material";
//  Components
import SectionLayout from "../../../../../components/reusableComponents/sectionLayout/sectionLayout.component";
import EventCard from "./components/eventCard/eventCard.component";
// Utilities
import findKeyWordsAndHighlight from "../../../../../setup/utils/helpers/findKeyWordsAndHighLight";
// Data
import cardMockData from "../../../../../websiteData/events/events.data.json";
// Assets
import cardImgOne from "../../../../../assets/homePage/events/card-img-1.svg";
import cardImgTwo from "../../../../../assets/homePage/events/card-img-2.svg";
import cardImgThree from "../../../../../assets/homePage/events/card-img-3.svg";
import cardImgFour from "../../../../../assets/homePage/events/card-img-4.svg";

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

const Events = () => {
  const theme = useTheme();

  const text =
    "Support your Overland Trailblazer baseball program by attending our upcoming events. We have lots happening in our community including fundraisers, team activities, and more. Check out all our events here and sign up!";
  const keywords = [{ keyword: "all our events here and sign up!", url: "/events", type: "RouterLink" }];
  const options = { color: theme.palette.secondary.main };

  const highlightedText = findKeyWordsAndHighlight(text, keywords, options);
  return (
    <Grid item xs={12}>
      <SectionLayout id="events-section" aria-label="Events Section">
        <Typography typography="h2" component="h2">
          Events
        </Typography>
        <Typography component="p" mb={4}>
          {highlightedText}
        </Typography>
        <Grid container rowSpacing={4}>
          {events.map((card, index) => (
            <EventCard card={card} index={index} />
          ))}
        </Grid>
      </SectionLayout>
    </Grid>
  );
};

export default Events;
