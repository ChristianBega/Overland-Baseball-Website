import { Container, Grid } from "@mui/material";
import React from "react";
// Components
import Hero from "../components/Hero";
import News from "../components/News";
import Events from "../components/Events";
import Schedule from "../components/Schedule";
import ContactUs from "../components/ContactUs";
// import Sponsors from "../../../components/sponsors/sponsors.component";
import useMediaQueries from "../../../utils/helpers/useMediaQueries.utils";

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
