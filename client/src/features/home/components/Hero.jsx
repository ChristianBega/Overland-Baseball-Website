import React from "react";
import { Link as RouterLink } from "react-router-dom";
// Components
import SectionLayout from "../../ui/components/SectionLayout";
// MUI
import { Box, Button, Typography } from "@mui/material";
// Assets
import heroBg from "../../../assets/heroNew.png";
// Styles
import { styles } from "./Hero.styles";
// Icons
import CallMadeIcon from "@mui/icons-material/CallMade";
const Hero = () => {
  return (
    <SectionLayout
      marginZero={true}
      id="hero"
      aria-label="Hero Section"
      component="section"
      sx={{
        backgroundImage: `url(${heroBg})`,
        ...styles.section,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `radial-gradient(circle at center, rgba(20, 30, 60, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%)`,
          filter: "brightness(90%) contrast(120%) saturate(110%) sepia(15%)",
          mixBlendMode: "overlay",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          boxShadow: "inset 0 0 100px 20px rgba(0,0,0,0.7)",
          pointerEvents: "none",
        },
      }}
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
        Welcome to the official site of the Overland Trailblazers Baseball Team! Find game schedules, events, news, and ways to support our players.
        <br />
        Start exploring below!
      </Typography>
      <Button
        sx={{ marginTop: "2rem", width: "100%", maxWidth: 400, marginInline: "auto" }}
        variant="contained"
        color="secondary"
        component={RouterLink}
        to="/authentication/sign-up"
        size="large"
        endIcon={<CallMadeIcon sx={{ fontSize: ".9rem" }} />}
      >
        Join Our Community
      </Button>
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "100%",
          zIndex: 1000,
          top: { xs: 505, sm: 510, heroSvg: 575, tablet: 555, lg: 600, xl: 600 },
        }}
      >
        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 120">
          <defs>
            <filter id="inner-shadow" x="-10%" y="-40%" width="120%" height="180%">
              <feOffset dx="0" dy="5" />
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="out" result="comp" />
              <feFlood flood-color="#382321ce" result="flood" />
              <feComposite in="flood" in2="comp" operator="in" result="comp2" />
              <feComposite in="comp2" in2="SourceGraphic" operator="over" result="final" />
            </filter>
          </defs>
          <path
            d="M 0,120 
       L 0,60
       C 50,30 100,20 150,30
       C 200,40 250,70 300,80
       C 350,90 400,90 450,80
       C 500,70 550,40 600,30
       C 650,20 700,30 750,50
       C 775,55 790,60 800,60
       L 800,120 Z"
            fill="white"
            filter="url(#inner-shadow)"
          />
        </svg> */}
      </Box>
    </SectionLayout>
  );
};

export default Hero;
