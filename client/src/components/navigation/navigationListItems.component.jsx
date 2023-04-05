import { Box, List, ListItem, styled, Typography } from "@mui/material";

import { Link } from "react-router-dom";

// Icons
import HomeIcon from "@mui/icons-material/Home";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import EventIcon from "@mui/icons-material/Event";
import TopicIcon from "@mui/icons-material/Topic";
// import SportsBaseballIcon from "@mui/icons-material/SportsBaseball";
import GroupsIcon from "@mui/icons-material/Groups";
import { useTheme } from "@emotion/react";

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
  justifyContent: "space-between",
  rowGap: theme.spacing(4), // 16px
  minWidth: "60vw",
  paddingInline: theme.spacing(6),
  // [theme.breakpoints.up("sm")]: {
  //   minWidth: "40vw",
  // },
  [theme.breakpoints.up("sm")]: {
    minWidth: "50vw",
  },
  [theme.breakpoints.up("lg")]: {
    flexDirection: "row",
    justifyContent: "center",
  },
}));
const StyledListItem = styled(ListItem)(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    display: "flex",
    justifyContent: "center",
    maxWidth: "180px",
  },
  paddingInline: 2,
  paddingBottom: 0,
  paddingTop: theme.spacing(5),
  borderTop: `1px solid ${theme.palette.accent.accentOne}`,
  "&:last-child": {
    borderBottom: `1px solid ${theme.palette.accent.accentOne}`,
    paddingBottom: theme.spacing(5),
  },
}));

// Get menu items
const getMenuItems = (handleClose, theme) => (
  <StyledList>
    {menuItemData.map((menuItem, index) => (
      <StyledListItem key={index} onClick={handleClose}>
        <Link to={menuItem.urlPath} key={menuItem.linkName}>
          <Typography typography={"linkTextDesktop"} sx={{ display: { xs: "none", lg: "flex" } }}>
            {menuItem.linkName}
          </Typography>
          <Typography sx={{ display: { xs: "flex", lg: "none" }, width: "100%" }}>
            <Box sx={{ display: "flex", alignItems: "center", color: theme.palette.primary.light }}>
              {menuItem.icon} &nbsp;
              <Typography ml={2} typography={"linkTextMobile"}>
                {menuItem.linkName}
              </Typography>
            </Box>
          </Typography>
        </Link>
      </StyledListItem>
    ))}
  </StyledList>
);

export default function NavigationListItems({ handleClose }) {
  const theme = useTheme();
  return <>{getMenuItems(handleClose, theme)}</>;
}
