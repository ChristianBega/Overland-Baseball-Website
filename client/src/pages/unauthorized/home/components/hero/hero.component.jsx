import React from "react";
import { useTheme } from "@emotion/react";
import { Link as RouterLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
// Components
import SectionLayout from "../../../../../components/reusableComponents/sectionLayout/sectionLayout.component";
// MUI
import { Box, Button, Stack, Typography } from "@mui/material";
// Assets
import OverlandLogo from "../../../../../assets/homePage/hero/hero-bg-temp.svg";
import OverlandLogo1 from "../../../../../assets/logos/overland-logo-1.svg";
// Styles
import { styles } from "./hero.styles";

const Hero = () => {
  const theme = useTheme();
  return (
    <SectionLayout id="hero" aria-label="Hero Section" component="section" sx={{ backgroundImage: `url(${OverlandLogo})`, ...styles.section }}>
      <Box sx={styles.box}>
        <Typography
          sx={{
            ...styles.typography,
            filter: `drop-shadow(0px 0px 2px ${theme.palette.accent.accentThree})`,
          }}
          variant="h1"
          component="h1"
          gutterBottom
        >
          <span style={{ fontSize: "75%" }}>Overland</span> <br /> Trailblazers
        </Typography>

        <img src={OverlandLogo1} alt="Overland Trailblazers Logo" style={styles.image} />
      </Box>
      <Typography variant="body1" sx={styles.text}>
        Welcome to the official site of the Overland Trailblazers Baseball Team! <br />
        Find game schedules, events & news, and ways to support our players. Start exploring below!
      </Typography>
      <Stack spacing={2} mt={4} sx={styles.stack}>
        <Button variant="contained" color="secondary" component={RouterLink} to="/authentication/sign-up">
          Sign Up For Blazer Update
        </Button>
        <Button variant="outlined" color="secondary" component={HashLink} to="/#contact-us-section">
          Get In Contact With Us
        </Button>
      </Stack>
    </SectionLayout>
  );
};

export default Hero;
