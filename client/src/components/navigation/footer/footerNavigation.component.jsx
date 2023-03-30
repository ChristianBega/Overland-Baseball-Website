import React from "react";
import { BottomNavigation, Grid } from "@mui/material";
import { Box } from "@mui/system";

// Components
import OverlandLogo from "./logofooter.component";
import LocationMap from "./locationMap.component";
import ContactUs from "./contactUs.component";
import Socials from "../../reusableComponents/socials.component";
import Copyright from "./copyright.component";
import styled from "@emotion/styled";
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
  return (
    <Box component="footer" id="footer" sx={{ flexGrow: 1 }}>
      <StyledBottomNavigation component="nav">
        <Grid container sx={{display:"flex", justifyContent:"space-between"}} >
          <OverlandLogo />
          <ContactUs />
          <Grid item xs={4} md={3} lg={4} >
          <Socials />
          </Grid>
          <LocationMap />
          <Copyright />
        </Grid>
      </StyledBottomNavigation>
    </Box>
  );
}
