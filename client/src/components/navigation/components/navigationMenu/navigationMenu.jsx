import React, { useState } from "react";
// Icons
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import EventIcon from "@mui/icons-material/Event";
import TopicIcon from "@mui/icons-material/Topic";
import GroupsIcon from "@mui/icons-material/Groups";
import SportsIcon from "@mui/icons-material/Sports";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
// MUI components
import { Box, IconButton } from "@mui/material";
// Components
import { StyledDrawerMenu } from "../../styles/index.styles";
import NavigationListItems from "../navigationListItems/navigationListItems";
// Utils
import useMediaQueries from "../../../../setup/utils/helpers/useMediaQueries.utils";

const menuItems = [
  { label: "Home", url: "/", icon: <HomeIcon fontSize="large" /> },
  { label: "Roster", url: "/roster", icon: <FormatListNumberedIcon fontSize="large" /> },
  { label: "Events", url: "/events", icon: <EventIcon fontSize="large" /> },
  // { label: "Boosters", url: "/boosters", icon: <SportsIcon fontSize="large" /> },
  // { label: "Documents", url: "/documents", icon: <TopicIcon fontSize="large" /> },
  { label: "Alumni", url: "/alumni", icon: <GroupsIcon fontSize="large" /> },
  { label: "Dashboard", url: "/dashboard", icon: <AdminPanelSettingsIcon fontSize="large" /> },
  // { label: "Sponsors", url: "/sponsors" },
];

const styles = {
  box: {
    marginBlock: "2rem",
    textAlign: "center",
  },
};

const NavigationMenu = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { isLg } = useMediaQueries();

  const handleOpen = () => {
    setOpenMenu(true);
  };
  const handleClose = () => {
    setOpenMenu(false);
  };
  return (
    <>
      {isLg ? (
        <NavigationListItems menuItems={menuItems} handleClose={handleClose} navListType="navigation-menu" />
      ) : (
        <>
          <IconButton onClick={handleOpen} size="large" edge="start" aria-label="menu">
            <MenuIcon fontSize="large" color="secondary" />
          </IconButton>
          <StyledDrawerMenu open={openMenu} anchor={"left"} onClose={handleClose}>
            <IconButton sx={{ marginLeft: "auto" }} variant="square" onClick={handleClose} color="primary.main" aria-label="exit menu">
              <CloseIcon fontSize="large" />
            </IconButton>

            <NavigationListItems menuItems={menuItems} handleClose={handleClose} navListType="navigation-menu" />
            <Box sx={styles.box}>{!isLg && <>**contact details here**</>}</Box>
          </StyledDrawerMenu>
        </>
      )}
    </>
  );
};

export default NavigationMenu;
