import React, { useContext } from "react";

// MUI components
import { BottomNavigation, Grid } from "@mui/material";

// Components
import OverlandLogo from "./components/footerLogo/logofooter.component";
import LocationMap from "./components/location/locationMap.component";
import ContactUs from "./components/conactUs/contactUs.component";
import Socials from "../reusableComponents/socials.component";

// Context
import { ThemeToggleContext } from "../../setup/context/components/themeToggler.context";

// Assets
import footerBg from "../../assets/footer/footer-bg-sm.svg";
import footerBgMd from "../../assets/footer/footer-bg-md.svg";
import footerBgLg from "../../assets/footer/footer-bg-lg.svg";

// Styled components
import styled from "@emotion/styled";

const StyledBottomNavigation = styled(BottomNavigation)(({ theme, currentTheme }) => ({
  overflow: "hidden",
  padding: theme.spacing(4),
  color: theme.palette.text.secondary,
  background: currentTheme === "dark" ? theme.palette.secondary.main : "radial-gradient(circle, #082463 0%, rgba(9,31,64,1) 100%)",
  height: "100%",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
    height: "60%",
    backgroundImage: `url(${footerBg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "calc(50% + 15px) center",
    scale: "1.2",
    zIndex: 0,
    filter: "blur(2px)",
    [theme.breakpoints.up("sm")]: {
      height: "55%",
      backgroundImage: `url(${footerBgMd})`,
      backgroundSize: "cover",
      backgroundPosition: "top",
    },
    [theme.breakpoints.up("md")]: {
      scale: "1.0",
      height: "85%",
      backgroundImage: `url(${footerBgLg})`,
    },
    [theme.breakpoints.up("lg")]: {
      height: "85%",
      backgroundImage: `url(${footerBgLg})`,
    },
  },
  "&::after": {
    content: '""',
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    backgroundImage: `linear-gradient(to top, #008a454b, #02318e65, ${theme.palette.primary.main})`,
    filter: "blur(10px)",
    zIndex: 1,
  },
}));

const styles = {
  gridContainer: {
    display: "flex",
    justifyContent: "center",
    zIndex: 100,
  },
};

export default function FooterNavigation() {
  const { currentTheme } = useContext(ThemeToggleContext);

  return (
    <StyledBottomNavigation currentTheme={currentTheme}>
      <Grid container spacing={4} rowSpacing={4} sx={styles.gridContainer}>
        <OverlandLogo />
        <ContactUs />
        <Socials dataTypeDevice="footer" />
        <LocationMap />
      </Grid>
    </StyledBottomNavigation>
  );
}
