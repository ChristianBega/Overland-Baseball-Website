import React from "react";
import { Link as RouterLink } from "react-router-dom";
// Components
import SectionLayout from "../../../../../components/reusableComponents/sectionLayout/sectionLayout.component";
// MUI
import { Button, Typography } from "@mui/material";
// Assets
import heroBg from "../../../../../assets/hero-bg-1.png";
// Styles
import { styles } from "./hero.styles";
// Icons
import CallMadeIcon from "@mui/icons-material/CallMade";

const Hero = () => {
  return (
    <SectionLayout
      marginZero={true}
      id="hero"
      aria-label="Hero Section"
      component="section"
      sx={{ backgroundImage: `url(${heroBg})`, ...styles.section }}
    >
      <Typography
        sx={{
          ...styles.typography,
        }}
        variant="h1"
        component="h1"
        gutterBottom
      >
        <span style={{ fontSize: "45%", lineHeight: "0.45" }}>Home Of The</span>
        <br />
        Blazers
      </Typography>

      <Typography variant="body1" sx={styles.text}>
        Welcome to the official site of the Overland Trailblazers Baseball Team! Find game schedules, events & news, and ways to support our players.
        Start exploring below!
      </Typography>
      <Button
        sx={{ marginTop: "2rem", width: { xs: "90%", sm: 350 }, marginInline: "auto" }}
        variant="contained"
        color="secondary"
        component={RouterLink}
        to="/authentication/sign-up"
        size="large"
        endIcon={<CallMadeIcon sx={{ fontSize: ".9rem" }} />}
      >
        Join Our Community
      </Button>
    </SectionLayout>
  );
};

export default Hero;
