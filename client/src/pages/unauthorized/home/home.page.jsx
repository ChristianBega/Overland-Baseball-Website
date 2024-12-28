import { Container } from "@mui/material";
import React from "react";
import Hero from "./components/hero/hero.component";

const HomePage = () => {
  return (
    <>
      <Hero />
      <Container component="main" id="home-page" aria-label="Home Page"></Container>
    </>
  );
};

export default HomePage;
