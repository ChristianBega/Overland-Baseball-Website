import React from "react";
import { BottomNavigation, Grid, useMediaQuery } from "@mui/material";

// Components
import OverlandLogo from "./logofooter.component";
import LocationMap from "./locationMap.component";
import ContactUs from "./contactUs.component";
import Socials from "../../reusableComponents/socials.component";
import Copyright from "./copyright.component";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";

const StyledBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
  padding: theme.spacing(6),
  color: theme.palette.text.primary,
  background: theme.palette.primary.main,
  height: "100%",
}));

export default function FooterNavigation() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <StyledBottomNavigation>
      <Grid container spacing={2} sx={{ display: "flex", justifyContent: "center" }}>
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
