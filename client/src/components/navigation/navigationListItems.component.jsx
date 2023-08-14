import { Box, List, ListItem, styled, Typography, useMediaQuery } from "@mui/material";

import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";

// Icons
import HomeIcon from "@mui/icons-material/Home";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import EventIcon from "@mui/icons-material/Event";
import TopicIcon from "@mui/icons-material/Topic";
import GroupsIcon from "@mui/icons-material/Groups";

// Components
import Socials from "../reusableComponents/socials.component";
import ContactUs from "./footer/contactUs.component";

// Navigation menu item data
const menuItemData = [
  { linkName: "Home", urlPath: "/", icon: <HomeIcon fontSize="large" /> },
  { linkName: "Roster", urlPath: "/roster", icon: <FormatListNumberedIcon fontSize="large" /> },
  { linkName: "Events", urlPath: "/events", icon: <EventIcon fontSize="large" /> },
  // { linkName: "Boosters", urlPath: "/boosters" },
  { linkName: "Documents", urlPath: "/documents", icon: <TopicIcon fontSize="large" /> },
  { linkName: "Alumni", urlPath: "/alumni", icon: <GroupsIcon fontSize="large" /> },
  // { linkName: "Sponsors", urlPath: "/sponsors" },
];

// Styled Components
const StyledList = styled(List)(({ theme }) => ({
  color: theme.palette.primary.main,
  display: "flex",
  flexDirection: "column",
  overflowX: "hidden",
  // overflowY: "hidden",
  rowGap: theme.spacing(4), // 16px
  minWidth: "60vw",
  paddingInline: theme.spacing(6),
  [theme.breakpoints.up("sm")]: {
    minWidth: "50vw",
  },
  [theme.breakpoints.up("lg")]: {
    flexDirection: "row",
    width: "900px",
    justifyContent: "space-evenly",
  },
  [theme.breakpoints.down("lg")]: {
    height: "100vh",
  },
}));
const StyledListItem = styled(ListItem)(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    // width: "100%",
    // border: "1px solid red",
    // textDecoration: "none !important",
    display: "flex",
    justifyContent: "space-evenly",
    width: "130px",
    // minWidth: "135px",
    // maxWidth: "180px",
    paddingTop: theme.spacing(0),
    borderTop: "none",
  },
  paddingInline: 2,
  paddingBottom: 0,
  paddingTop: theme.spacing(5),
  borderTop: `1px solid ${theme.palette.borders.primary}`,
  "&:hover": {
    // textDecoration: "underline",
    listStyle: "none",
  },
  [theme.breakpoints.down("lg")]: {
    "&:last-child": {
      borderBottom: `1px solid ${theme.palette.borders.primary}`,
      paddingBottom: theme.spacing(5),
    },
  },
}));

// Get menu items
const getMenuItems = (handleClose, theme, isMobile) => (
  <StyledList>
    {menuItemData.map((menuItem, index) => (
      <StyledListItem key={index} onClick={handleClose}>
        <Link to={menuItem.urlPath} key={menuItem.linkName}>
          <Typography typography={"linkTextDesktop"} sx={{ display: { xs: "none", lg: "flex", justifyContent: "center" } }}>
            {menuItem.linkName}
          </Typography>
          <Box component="span" sx={{ display: { xs: "flex", lg: "none" }, width: "100%" }}>
            <Box sx={{ display: "flex", alignItems: "center", color: theme.palette.primary.light }}>
              {menuItem.icon}
              <Typography ml={2} typography="linkTextMobile">
                {menuItem.linkName}
              </Typography>
            </Box>
          </Box>
        </Link>
      </StyledListItem>
    ))}
    {isMobile && (
      <>
        <Socials dataTypeDevice="mobile" />
        <ContactUs />
      </>
    )}
  </StyledList>
);

export default function NavigationListItems({ handleClose }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  return <>{getMenuItems(handleClose, theme, isMobile)}</>;
}
