import { Box, List, ListItem, styled, Typography, useMediaQuery } from "@mui/material";

import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";

// Icons
import HomeIcon from "@mui/icons-material/Home";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import EventIcon from "@mui/icons-material/Event";
import TopicIcon from "@mui/icons-material/Topic";
import GroupsIcon from "@mui/icons-material/Groups";
import SportsIcon from "@mui/icons-material/Sports";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
// Components
import Socials from "../reusableComponents/socials.component";
import ContactUs from "./footer/contactUs.component";
import { useContext } from "react";
import { UserContext } from "../../setup/context/user.context";

// Navigation menu item data
const menuItemData = [
  { linkName: "Home", urlPath: "/", icon: <HomeIcon fontSize="large" /> },
  { linkName: "Roster", urlPath: "/roster", icon: <FormatListNumberedIcon fontSize="large" /> },
  { linkName: "Events", urlPath: "/events", icon: <EventIcon fontSize="large" /> },
  { linkName: "Boosters", urlPath: "/boosters", icon: <SportsIcon fontSize="large" /> },
  { linkName: "Documents", urlPath: "/documents", icon: <TopicIcon fontSize="large" /> },
  { linkName: "Alumni", urlPath: "/alumni", icon: <GroupsIcon fontSize="large" /> },
  { linkName: "Dashboard", urlPath: "/dashboard", icon: <AdminPanelSettingsIcon fontSize="large" /> },

  // { linkName: "Sponsors", urlPath: "/sponsors" },
];

// Styled Components
const StyledList = styled(List)(({ theme }) => ({
  color: theme.palette.primary.main,
  display: "flex",
  flexDirection: "column",
  overflowX: "hidden",
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
    display: "flex",
    justifyContent: "space-evenly",
    width: "130px",
    paddingTop: theme.spacing(0),
    borderTop: "none",
  },
  paddingInline: 2,
  paddingBottom: 0,
  paddingTop: theme.spacing(5),
  borderTop: `1px solid ${theme.palette.borders.primary}`,

  [theme.breakpoints.down("lg")]: {
    "&:last-child": {
      borderBottom: `1px solid ${theme.palette.borders.primary}`,
      paddingBottom: theme.spacing(5),
    },
  },
}));

const getMenuItems = (handleClose, theme, isMobile, role) => {
  const allowedRolesToShowDocuments = ["player", "coach", "parent", "admin"];
  const allowedRolesToShowAdmin = ["admin"];

  const filteredMenuItems = menuItemData.filter((menuItem) => {
    if (menuItem.linkName === "Documents" && !allowedRolesToShowDocuments.includes(role)) {
      return false; // Exclude the "Documents" menu item for specified roles
    }
    if (menuItem.linkName === "Dashboard" && !allowedRolesToShowAdmin.includes(role)) {
      return false; // Exclude the "Dashboard" menu item for specified roles
    }
    return true; // Include all other menu items
  });

  return (
    <StyledList>
      {filteredMenuItems.map((menuItem, index) => (
        <StyledListItem key={index} onClick={handleClose}>
          {/* Desktop link text */}
          <Typography
            typography="linkTextDesktop"
            component={Link}
            to={menuItem.urlPath}
            key={menuItem.linkName}
            sx={{ display: { xs: "none", lg: "flex", justifyContent: "center" } }}
          >
            {menuItem.linkName}
          </Typography>

          {/* Mobile List items */}
          <Box component="span" sx={{ display: { xs: "flex", lg: "none" }, width: "100%" }}>
            <Box sx={{ display: "flex", alignItems: "center", color: theme.palette.primary.light }}>
              {menuItem.icon}
              {/* mobile link text */}
              <Typography ml={2} component={Link} typography="linkTextMobile" to={menuItem.urlPath} key={`${menuItem.linkName}-mobile`}>
                {menuItem.linkName}
              </Typography>
            </Box>
          </Box>
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
};

export default function NavigationListItems({ handleClose }) {
  const { currentUserProfile } = useContext(UserContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  return <>{getMenuItems(handleClose, theme, isMobile, currentUserProfile?.role)}</>;
}
