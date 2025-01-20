// import { newsData } from "../../../../../websiteData/home.data";
import React from "react";
import { useTheme } from "@emotion/react";
// Mui
import { Box, Grid, Typography } from "@mui/material";
// Components
import SectionLayout from "../../../../../components/reusableComponents/sectionLayout/sectionLayout.component";
// Utils & Helpers
import findKeyWordsAndHighlight from "../../../../../setup/utils/helpers/findKeyWordsAndHighLight";
import useMediaQueries from "../../../../../setup/utils/helpers/useMediaQueries.utils";
import TEMP_IMAGE from "../../../../../assets/placeholder.png";

export default function News() {
  const theme = useTheme();
  const { isMd } = useMediaQueries();
  // ! this data will be moved to the websiteData folder and mimic the cms structure we want. we will need to refactor later.
  const text = "Stay tuned for exciting news about our fundraisers, upcoming games, and all other events.";
  const keywords = [
    { keyword: "upcoming games", url: "/#schedule-section", type: "HashLink" },
    { keyword: "fundraisers", url: "/#events-section", type: "HashLink" },
    // { keyword: "useful links", url: "/#links", type: "HashLink" },
    { keyword: "all other events", url: "/events", type: "RouterLink" },
  ];
  const options = { color: theme.palette.secondary.main };

  const highlightedText = findKeyWordsAndHighlight(text, keywords, options);

  return (
    <>
      <Grid item xs={12} md={7} lg={6} sx={{ position: "relative" }}>
        <SectionLayout id="news-section" aria-label="News Section">
          <Typography typography="h2" component="h2">
            Blazer News
          </Typography>
          <Typography typography="p" component="p">
            Welcome to the official site of Overland Baseball in Aurora, Colorado! At Overland, we’re dedicated to building strong, skilled players
            through a focus on fundamentals, targeted training, and continuous improvement. Our Trailblazers Baseball program is rapidly growing and
            is designed to support athletes ages 13-18 who are eager to elevate their game.
          </Typography>
          <Typography component="p">{highlightedText}</Typography>
        </SectionLayout>
      </Grid>
      {isMd && (
        <Grid item xs={12} md={5} lg={6}>
          <SectionLayout id="news-section-image-slider" aria-label="News Section Image Slider">
            <Box component="img" src={TEMP_IMAGE} sx={{ border: "1px solid red", width: "100%", maxHeight: "350px" }}></Box>
          </SectionLayout>
        </Grid>
      )}
    </>
  );
}
{
  /* <StyledSocialBox>
          <Socials />
        </StyledSocialBox> */
}
