import React from "react";
import { Link as RouterLink } from "react-router-dom";
// Components
import ButtonBlock from "../../ui/components/ButtonBlock";
import TextBlock from "../../ui/components/TextBlock";
import { Navigation } from "../../navigation";
import { StyledHeroTypography, StyledSectionLayout } from "./Hero.styles";
// MUI
import { Button, Typography } from "@mui/material";
// Assets
import medley2 from "../../../assets/imagesSlider/Medleyhitting.webp";
// Utils
import useMediaQueries from "../../../utils/helpers/useMediaQueries.utils";

const Hero = () => {
  const { isSm } = useMediaQueries();
  return (
    <StyledSectionLayout
      customMargin={!isSm ? "1rem !important" : "2rem !important"}
      id="hero"
      aria-label="Hero Section"
      component="section"
      backgroundImage={medley2}
    >
      <Navigation isTransparent={true} />
      <TextBlock sx={{ zIndex: 500 }}>
        <StyledHeroTypography variant="h1" component="h1" gutterBottom>
          <span style={{ fontSize: "45%", lineHeight: "0.45" }}>Home Of The</span>
          <br />
          Blazers
        </StyledHeroTypography>
        <Typography component="p" variant="p">
          Welcome to the official site of the Overland Trailblazers Baseball Team! Find game schedules, events, news, and ways to support our players.
          Start exploring below!
        </Typography>
        <ButtonBlock direction={isSm ? "row" : "column"} spacing={2} justifyContent="center" mt={4} sx={{ paddingInline: "1rem" }}>
          <Button variant="contained" color="secondary" component={RouterLink} to="/authentication/sign-up" size="large">
            Join Our Community
          </Button>
          <Button variant="outlined" color="secondary" component={RouterLink} to="/boosters/volunteer" size="large">
            Interested in volunteering?
          </Button>
        </ButtonBlock>
      </TextBlock>
    </StyledSectionLayout>
  );
};

export default Hero;
