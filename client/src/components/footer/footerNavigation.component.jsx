import React, { useContext } from "react";
// MUI components
import { BottomNavigation, Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
// Components
import OverlandLogo from "./logofooter.component";
import LocationMap from "./locationMap.component";
import ContactUs from "./contactUs.component";
import Socials from "../reusableComponents/socials.component";
import Copyright from "./copyright.component";
// Context
import { ThemeToggleContext } from "../../setup/context/components/themeToggler.context";
// Styled components
import styled from "@emotion/styled";

const StyledBottomNavigation = styled(BottomNavigation)(({ theme, currentTheme }) => ({
  padding: theme.spacing(6),
  color: theme.palette.text.secondary,
  background: currentTheme === "dark" ? theme.palette.secondary.main : theme.palette.primary.main,
  height: "100%",
}));

const styles = {
  gridContainer: {
    display: "flex",
    justifyContent: "center",
  },
};

export default function FooterNavigation() {
  const { currentTheme } = useContext(ThemeToggleContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <StyledBottomNavigation currentTheme={currentTheme}>
      <Grid container spacing={2} sx={styles.gridContainer}>
        <OverlandLogo />
        {isMobile && (
          <Grid item xs={12} sm={4} md={3}>
            <ContactUs />
          </Grid>
        )}
        <Grid item xs={12} sm={4} md={4}>
          <Socials dataTypeDevice="footer" />
        </Grid>
        <LocationMap />
        {!isMobile && (
          <Grid item xs={6} md={4}>
            <ContactUs />
          </Grid>
        )}
        <Copyright />
      </Grid>
    </StyledBottomNavigation>
  );
}
