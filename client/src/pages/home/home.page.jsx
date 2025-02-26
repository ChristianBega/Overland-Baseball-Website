import { Container, Grid } from "@mui/material";
import React from "react";
// Components
import Hero from "./components/hero/hero.component";
import News from "./components/news/news.component";
import Events from "./components/events/events.components";
import Schedule from "./components/schedule/schedule.component";
import ContactUs from "./components/contactUs/contactUs.component";
// import Sponsors from "../../../components/sponsors/sponsors.component";
import useMediaQueries from "../../setup/utils/helpers/useMediaQueries.utils";

const HomePage = () => {
  const { isLg } = useMediaQueries();
  return (
    <>
      <Hero />
      <Container component="main" id="home-page" aria-label="Home Page">
        <Grid container id="home-page-grid" columnSpacing={isLg ? 6 : 4}>
          <News />
          <Events />
          <Schedule />
          <ContactUs />
          {/* <Sponsors /> */}
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;
