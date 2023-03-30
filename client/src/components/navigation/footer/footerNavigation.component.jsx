import React from "react";
import { BottomNavigation, Grid, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";

// Components
import OverlandLogo from "./logofooter.component";
import LocationMap from "./locationMap.component";
import ContactUs from "./contactUs.component";
import Socials from "../../reusableComponents/socials.component";
import Copyright from "./copyright.component";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";

const StyledBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
  // display: "flex",
  // justifyContent: "space-between",
  padding: theme.spacing(6), // 7px 14px
  color: theme.palette.text.primary,
  background: theme.palette.primary.main,
  height: "100%",
  // [theme.breakpoints.up("lg")]: {
  //   display: "none",
  // },
}));

export default function FooterNavigation() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box component="footer" id="footer" sx={{ flexGrow: 1 }}>
      <StyledBottomNavigation component="nav">
        <Grid container spacing={2} sx={{ display: "flex", justifyContent: "center" }}>
          <OverlandLogo />
          {isMobile && (
            <Grid item xs={12} sm={4} md={3}>
              <ContactUs />
            </Grid>
          )} 
          <Grid item xs={12} sm={4} md={3}>
            <Socials />
          </Grid>

          <Grid item xs={12} md={4}>
            <LocationMap />
          </Grid>
          {!isMobile && (
            <Grid item xs={6} md={3}>
              <ContactUs />
            </Grid>
          )}

          {/* <Grid item xs={6} md={5} sx={{ display: "flex", flexDirection: "column", flexGrow: 1, alignItems: "center" }}>
          </Grid> */}
          <Copyright />
        </Grid>
      </StyledBottomNavigation>
    </Box>
  );
}
