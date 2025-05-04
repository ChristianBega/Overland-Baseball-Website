import React, { useState } from "react";
// Icons
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import EventIcon from "@mui/icons-material/Event";
// import TopicIcon from "@mui/icons-material/Topic";
import GroupsIcon from "@mui/icons-material/Groups";
// import SportsIcon from "@mui/icons-material/Sports";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import OverlandLogo from "./FooterLogo";
import ContactUs from "./ContactUs";
// MUI components
import { Box, Divider, IconButton, Stack } from "@mui/material";
// Components
import { StyledDrawerMenu } from "../styles/index.styles";
import NavigationListItems from "./NavigationListItems";
// Utils
import useMediaQueries from "../../../setup/utils/helpers/useMediaQueries.utils";
import Socials from "../../../features/ui/components/Socials.";

const menuItems = [
  { label: "Home", url: "/", icon: <HomeIcon fontSize="small" /> },
  { label: "Roster", url: "/roster", icon: <FormatListNumberedIcon fontSize="small" /> },
  { label: "Events", url: "/events", icon: <EventIcon fontSize="small" /> },
  { label: "Alumni", url: "/alumni", icon: <GroupsIcon fontSize="small" /> },
  { label: "Dashboard", url: "/dashboard", icon: <AdminPanelSettingsIcon fontSize="small" /> },
  // { label: "Boosters", url: "/boosters", icon: <SportsIcon fontSize="large" /> },
  // { label: "Documents", url: "/documents", icon: <TopicIcon fontSize="large" /> },
  // { label: "Sponsors", url: "/sponsors" },
];

const styles = {
  box: {
    marginBlock: "2rem",
    textAlign: "center",
    padding: "1rem",
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
            <Stack direction="column" justifyContent="space-between">
              <IconButton variant="square" sx={{ marginLeft: "auto" }} onClick={handleClose} color="primary.main" aria-label="exit menu">
                <CloseIcon fontSize="large" />
              </IconButton>
              {/* <Stack direction="column" alignItems="center">
                <img src="https://placehold.co/25x25" alt="placeholder" style={{ width: "45px", height: "45px" }} />
                <Typography variant="h6">User Name</Typography>
                </Stack> */}
            </Stack>

            <OverlandLogo textColor="primary.main" noHover={true} />
            <NavigationListItems menuItems={menuItems} handleClose={handleClose} navListType="navigation-menu" />
            <Divider sx={{ marginInline: "1rem" }} />
            <Box sx={styles.box}>
              <ContactUs sx={{ mb: "2rem" }} />
              <Socials dataTypeDevice="footer" />
            </Box>
          </StyledDrawerMenu>
        </>
      )}
    </>
  );
};

export default NavigationMenu;
