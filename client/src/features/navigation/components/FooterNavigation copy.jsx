import React, { useContext } from "react";

// MUI components
import { BottomNavigation, Box, Divider, Grid, Stack, Typography } from "@mui/material";

// Components
import logo from "../../../assets/overlandLogo_3.webp";
// import OverlandLogo from "./FooterLogo";
import LocationMap from "./LocationMap";
// import ContactUs from "./ContactUs";
// import Socials from "../../../features/ui/components/Socials.";
import TextBlock from "../../ui/components/TextBlock";
// Context
import { ThemeToggleContext } from "../../../features/themeShowcase/context/ThemeToggler.context";

// Assets
import footerBg from "../../../assets/footer/footer-bg-sm.svg";
import footerBgMd from "../../../assets/footer/footer-bg-md.svg";
import footerBgLg from "../../../assets/footer/footer-bg-lg.svg";

// Styled components
import styled from "@emotion/styled";
import { Phone, Email, LocationOn } from "@mui/icons-material";
import NavigationListItems from "./NavigationListItems";
import useMediaQueries from "../../../utils/helpers/useMediaQueries.utils";
import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";

const StyledBottomNavigation = styled(BottomNavigation)(({ theme, currentTheme }) => ({
  overflow: "hidden",
  padding: theme.spacing(2),
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
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  [theme.breakpoints.up("md")]: {
    // margin: "2rem",
    // borderRadius: "20px",
    padding: theme.spacing(4),
  },
  [theme.breakpoints.up("lg")]: {
    padding: theme.spacing(8),
    paddingInline: "6.5rem",
  },
}));

const menuItems = [
  { label: "Roster", url: "/roster" },
  { label: "Events", url: "/events" },
  { label: "Alumni", url: "/alumni" },
  { label: "Sign In", url: "/sign-in" },
];

const menuItems1 = [
  {
    icon: <LocationOn sx={{ fontSize: "20px" }} />,
    label: "12399 E Jewell Ave, Aurora, CO 80012",
    href: "https://www.google.com/maps/dir/?api=1&destination=39.682822188705124,-104.84414943550574",
  },
  {
    icon: <Phone sx={{ fontSize: "20px" }} />,
    label: "720-505-3962",
    href: "tel:+17205053962",
  },
  {
    icon: <Email sx={{ fontSize: "20px" }} />,
    label: "mbega@cherrycreekschools.org",
    href: "mailto:mbega@cherrycreekschools.org",
  },
];

export default function FooterNavigation() {
  const { currentTheme } = useContext(ThemeToggleContext);
  const theme = useTheme();
  const { isMd, isSm } = useMediaQueries();

  return (
    <StyledBottomNavigation currentTheme={currentTheme}>
      <Grid container rowSpacing={4} columnSpacing={4} sx={{ display: "flex", justifyContent: "center", zIndex: 100 }}>
        <Grid item xs={12}>
          <Stack direction={isSm ? "row" : "column"} spacing={2} alignItems="center" justifyContent="space-between">
            <Link to="/">
              <Box component="img" sx={{ height: "85px", width: "135px" }} src={logo}></Box>
            </Link>
            <Box sx={{ border: theme.palette.accent.accentOne, padding: ".5rem 1rem", backgroundColor: "rgba(255, 255, 255, 0.1)" }}>
              <Typography component="span" variant="p" color="text.secondary" sx={{ fontStyle: "italic", textTransform: "uppercase" }}>
                Home Of The Blazes <span aria-hidden="true">•</span> Est. 1978
              </Typography>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={8} md={5}>
          <TextBlock>
            <Typography component="h2" variant={isMd ? "h6" : "h4"} mb={2}>
              Get In Touch
            </Typography>
            <NavigationListItems menuItems={menuItems1} handleClose={() => {}} navListType="navigation-menu-footer" />
          </TextBlock>
        </Grid>
        <Grid item xs={12} sm={4} md={3} xl={4}>
          <TextBlock>
            <Typography component="h2" variant={isMd ? "h6" : "h4"} mb={2}>
              Quick Links
            </Typography>
            <NavigationListItems menuItems={menuItems} handleClose={() => {}} navListType="navigation-menu-footer" />
          </TextBlock>
        </Grid>
        <Grid item xs={12} sm={12} md={4} xl={3}>
          <TextBlock>
            <Typography component="h2" variant={isMd ? "h6" : "h4"} mb={2}>
              Location
            </Typography>
          </TextBlock>
          <LocationMap />
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ margin: "2rem 0", borderColor: "#ffffff8f" }} />
          <TextBlock sx={{ textAlign: "center" }}>
            <Typography component="p" variant="p" color="text.secondary">
              © 2023 Overland Baseball, All Rights Reserved
            </Typography>
          </TextBlock>
        </Grid>
      </Grid>
    </StyledBottomNavigation>
  );
}
