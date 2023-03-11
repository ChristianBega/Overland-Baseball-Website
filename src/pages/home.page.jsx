import React from "react";
import HeroBackground from "../components/home/heroBg.component";
import { Container, Grid, styled, Typography } from "@mui/material";
import { Paper } from "@mui/material";

export default function HomePage() {
  // const theme = useTheme();
  return (
    <>
      <HeroBackground />
      <Grid container id="h" component="section" maxWidth="lg"></Grid>
    </>
  );
}
