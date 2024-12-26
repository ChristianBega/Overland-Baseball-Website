import { Box, Drawer, Grid, IconButton, styled } from "@mui/material";
import React, { useState } from "react";
import NavigationListItems from "../navigationListItems/navigationListItems";
// Icons
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
// import { ThemeToggleContext } from "../../../../setup/context/components/themeToggler.context";
// import { useTheme } from "@emotion/react";
// Icons
import HomeIcon from "@mui/icons-material/Home";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import EventIcon from "@mui/icons-material/Event";
import TopicIcon from "@mui/icons-material/Topic";
import GroupsIcon from "@mui/icons-material/Groups";
import SportsIcon from "@mui/icons-material/Sports";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { StyledDrawerMenu } from "../../styles/index.styles";
import useMediaQueries from "../../../../setup/utils/helpers/useMediaQueries.utils";
import Socials from "../../../reusableComponents/socials.component";
import ContactUs from "../../../footer/contactUs.component";
const menuItems = [
  { label: "Home", url: "/", icon: <HomeIcon fontSize="large" /> },
  { label: "Roster", url: "/roster", icon: <FormatListNumberedIcon fontSize="large" /> },
  { label: "Events", url: "/events", icon: <EventIcon fontSize="large" /> },
  { label: "Boosters", url: "/boosters", icon: <SportsIcon fontSize="large" /> },
  { label: "Documents", url: "/documents", icon: <TopicIcon fontSize="large" /> },
  { label: "Alumni", url: "/alumni", icon: <GroupsIcon fontSize="large" /> },
  { label: "Dashboard", url: "/dashboard", icon: <AdminPanelSettingsIcon fontSize="large" /> },

  // { label: "Sponsors", url: "/sponsors" },
];
// const StyledDrawerMenu = styled(Drawer)(({ theme }) => ({
//   background: "rgba(0, 0, 0, 0.7)",
//   width: "100%",
//   [theme.breakpoints.up("md")]: {
//     width: "30%",
//   },
// }));
const NavigationMenu = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { isLg, isMd } = useMediaQueries();
  // const { currentTheme } = useContext(ThemeToggleContext);
  // const theme = useTheme();

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
            <Box sx={{ marginBlock: "2rem", textAlign: "center" }}>
              {!isLg && (
                <>
                  {/* <Socials dataTypeDevice="mobile" /> */}
                  **contact details here**
                  {/* <ContactUs /> */}
                </>
              )}
            </Box>
          </StyledDrawerMenu>
        </>
      )}
    </>
  );
};

export default NavigationMenu;
