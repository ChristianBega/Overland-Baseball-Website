import { Container, Grid } from "@mui/material";
import React from "react";
import Hero from "./components/hero/hero.component";
import News from "./components/news/news.component";

const HomePage = () => {
  return (
    <>
      <Hero />
      <Container component="main" id="home-page" aria-label="Home Page">
        <Grid container id="home-page-grid">
          <News />
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;
