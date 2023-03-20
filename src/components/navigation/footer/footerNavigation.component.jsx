import React from "react";
import { BottomNavigation, Grid } from "@mui/material";
import { Box } from "@mui/system";

// Components
import OverlandLogo from "../logo.component";
import ContactUs from "./contactUs.component";
import Socials from "./socials.component";
import Copyright from "./copyright.component";
import LocationMap from "./location.component";
export default function FooterNavigation() {
  return (
    <Box component="footer" id="footer" sx={{ flexGrow: 1 }}>
      <BottomNavigation component="nav">
        <Grid container>
          <OverlandLogo />
          <ContactUs />
          <Socials />
          <LocationMap />
          <Copyright />
        </Grid>
      </BottomNavigation>
    </Box>
  );
}
