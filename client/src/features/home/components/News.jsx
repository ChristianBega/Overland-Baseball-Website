import React from "react";
import { Link as RouterLink } from "react-router-dom";

// Mui
import { Grid, Typography, Button } from "@mui/material";
// Components
import SectionLayout from "../../ui/components/SectionLayout";
// Utils & Helpers
import useMediaQueries from "../../../utils/helpers/useMediaQueries.utils";
import NewsImageSlider from "../components/NewsImageSlider";
import TextBlock from "../../ui/components/TextBlock";
import ButtonBlock from "../../ui/components/ButtonBlock";

export default function News() {
  const { isMd, isSm, isLg } = useMediaQueries();

  return (
    <Grid item xs={12}>
      <Grid container columnSpacing={isLg ? 6 : 4}>
        <Grid item xs={12} md={5} lg={6} order={{ md: 2 }}>
          <SectionLayout id="news-section-image-slider" aria-label="News Section Image Slider">
            <NewsImageSlider />
          </SectionLayout>
        </Grid>
        <Grid item xs={12} md={7} lg={6} sx={{ position: "relative" }} order={{ md: 1 }}>
          <SectionLayout customMargin={isMd ? "" : "1.5rem 0 0 0 !important"} id="news-section" aria-label="News Section">
            <TextBlock
              alignItems={isSm ? "flex-start" : "center"}
              justifyContent={isSm ? "flex-start" : "center"}
              sx={{ textAlign: { xs: "center", sm: "left" } }}
            >
              <Typography typography="h2" component="h2">
                Blazer News
              </Typography>
              <Typography component="p" typography="p">
                Welcome to the official site of Overland Baseball in Aurora, Colorado! At Overland, we're dedicated to building strong, skilled
                players through a focus on fundamentals, targeted training, and continuous improvement. Our Trailblazers Baseball program is rapidly
                growing and is designed to support athletes ages 13-18 who are eager to elevate their game.
              </Typography>
              <Typography component="h3" typography="h3" gutterBottom>
                Don't miss out on our events
              </Typography>
              <Typography component="p" typography="p" mb={0}>
                We'll keep you updated on fundraisers, upcoming games, and all other team activities.
              </Typography>
              {/* Single CTA Button */}
            </TextBlock>
            <ButtonBlock mt={4} spacing={2} justifyContent="center" alignItems="center">
              {/* Primary Button - Sign Up */}
              <Button variant="contained" color="secondary" component={RouterLink} to="/authentication/sign-up" size="large" fullWidth>
                Sign Up for Updates
              </Button>
            </ButtonBlock>
          </SectionLayout>
        </Grid>
      </Grid>
    </Grid>
  );
}
