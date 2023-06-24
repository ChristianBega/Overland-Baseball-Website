import { useTheme } from "@emotion/react";
import { Container, Grid, useMediaQuery } from "@mui/material";

// Components
import News from "../components/home/news.component";
import HeroBackground from "../components/home/heroBg.component";
import Schedule from "../components/home/schedule.component";
import Sponsors from "../components/sponsors/sponsors.component";
import ImageSlider from "../components/home/imageSlider.component";
import CTAGrid from "../components/home/callToActions.component";
import { useEffect } from "react";

export default function HomePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {/* <HeroBackground /> */}
      <Container component="section" id="home-section" style={{ display: "flex", justifyContent: " center", marginTop: "3rem" }}>
        <Grid container maxWidth="xl" spacing={{ xs: 4, md: 20 }}>
          <News />
          <ImageSlider />
          {!isMobile && <CTAGrid />}
          <Schedule />
          {isMobile && <CTAGrid />}
          <Sponsors />
        </Grid>
      </Container>
    </>
  );
}
