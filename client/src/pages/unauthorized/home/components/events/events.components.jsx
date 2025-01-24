import React, { useState } from "react";
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

import useMediaQueries from "../../../../../setup/utils/helpers/useMediaQueries.utils";

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
  const { isMd } = useMediaQueries();
  const theme = useTheme();
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);

  const text =
    "Help support your Overland Trailblazer baseball program by attending our upcoming events. We have lots happening in our community including fundraisers, team activities, and more. Check out all our events here and sign up!";
  const keywords = [{ keyword: "all our events here and sign up!", url: "/events", type: "RouterLink" }];
  const options = { color: theme.palette.secondary.main };

  const highlightedText = findKeyWordsAndHighlight(text, keywords, options);
  return (
    <Grid item xs={12}>
      <SectionLayout id="events-section" aria-label="Events Section">
        <Typography typography="h2" component="h2">
          Events
        </Typography>
        <Typography component="p" typography="p"></Typography>
        <Typography component="p" typography="p">
          {highlightedText}
        </Typography>
        <Grid container rowSpacing={4} columnSpacing={2}>
          {isMd ? (
            <>
              <EventCard
                key={selectedCardIndex}
                card={events[selectedCardIndex]}
                index={selectedCardIndex}
                selectedCardIndex={selectedCardIndex}
                setSelectedCardIndex={setSelectedCardIndex}
              />

              <Grid item md={6}>
                <Grid container rowSpacing={2}>
                  {events.map((card, index) => {
                    if (index !== selectedCardIndex) {
                      return (
                        <Grid item xs={12} key={index}>
                          <EventCard card={card} index={index} selectedCardIndex={selectedCardIndex} setSelectedCardIndex={setSelectedCardIndex} />
                        </Grid>
                      );
                    }
                    return null;
                  })}
                </Grid>
              </Grid>
            </>
          ) : (
            <>
              {events.map((card, index) => (
                <EventCard key={index} card={card} index={index} selectedCardIndex={selectedCardIndex} setSelectedCardIndex={setSelectedCardIndex} />
              ))}
            </>
          )}
        </Grid>
      </SectionLayout>
    </Grid>
  );
};

export default Events;
