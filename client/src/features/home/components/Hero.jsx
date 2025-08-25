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
import alemanHeroImage from "../../../assets/imagesSlider/AlemanHeroImage.jpg";

// Utils
import useMediaQueries from "../../../utils/helpers/useMediaQueries.utils";

const Hero = () => {
  const { isXl } = useMediaQueries();
  return (
    <StyledSectionLayout marginZero={true} id="hero" aria-label="Hero Section" component="section" backgroundImage={alemanHeroImage}>
      <Navigation isTransparent={true} />
      {/* TODO: remove inline css to styled component */}
      <TextBlock
        sx={{
          zIndex: 500,
          textAlign: isXl ? "left" : "center",
          maxWidth: "1184px",
          minWidth: { lg: "1100", xl: "1184px" },
          marginLeft: { xl: "48px" },
          marginTop: { lg: "100px" },
        }}
        justifyContent={isXl ? "flex-start" : "center"}
        alignItems={isXl ? "flex-start" : "center"}
      >
        <StyledHeroTypography variant="h1" component="h1" gutterBottom>
          <span style={{ fontSize: "45%", lineHeight: "0.45" }}>Home Of The</span>
          <br />
          Blazers
        </StyledHeroTypography>
        {/* TODO: remove inline css to styled component */}
        <Typography component="p" variant="p" sx={{ maxWidth: { xs: "600px", lg: "950px" }, paddingInline: { xs: ".5rem", md: "0" }, color: "#fff" }}>
          Welcome to the official site of the Overland Trailblazers Baseball Team! Find game schedules, events, news, and ways to support our players.
          Start exploring below!
        </Typography>
        <ButtonBlock sx={{ paddingInline: { xs: "1rem", md: "0" } }}>
          <Button variant="contained" color="secondary" component={RouterLink} to="/authentication/sign-up" size="large" fullWidth>
            Join Our Community
          </Button>
        </ButtonBlock>
      </TextBlock>
    </StyledSectionLayout>
  );
};

export default Hero;
