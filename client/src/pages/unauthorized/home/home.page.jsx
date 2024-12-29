import { Container, Grid } from "@mui/material";
import React from "react";
// Components
import Hero from "./components/hero/hero.component";
import News from "./components/news/news.component";
import Events from "./components/events/events.components";

const HomePage = () => {
  return (
    <>
      <Hero />
      <Container component="main" id="home-page" aria-label="Home Page">
        <Grid container id="home-page-grid">
          <News />
          <Events />
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;
