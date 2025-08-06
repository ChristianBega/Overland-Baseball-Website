import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Icons
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import EventIcon from "@mui/icons-material/Event";
import GroupsIcon from "@mui/icons-material/Groups";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
// import TopicIcon from "@mui/icons-material/Topic";
// import SportsIcon from "@mui/icons-material/Sports";
// MUI components
import { Button, Divider, Stack } from "@mui/material";
// Components
import { StyledDrawerMenu } from "../styles/index.styles";
import OverlandLogo from "./FooterLogo";
import ContactUs from "./ContactUs";
import NavigationListItems from "./NavigationListItems";
import Socials from "../../../features/ui/components/Socials.";
import ButtonBlock from "../../ui/components/ButtonBlock";
// Styled Components
import { StyledMenuIconButton, StyledCloseIconButton, StyledMenuContentBox } from "./NavigationMenu.styles";
// Utils
import useMediaQueries from "../../../utils/helpers/useMediaQueries.utils";
import { useRoleCheck } from "../../../hooks/useRoleCheck";
import { signOutUser } from "../../auth/utils/authUtils";

const menuItems = [
  { label: "Home", url: "/", icon: <HomeIcon fontSize="small" /> },
  { label: "Roster", url: "/roster", icon: <FormatListNumberedIcon fontSize="small" /> },
  { label: "Events", url: "/events", icon: <EventIcon fontSize="small" /> },
  { label: "Alumni", url: "/alumni", icon: <GroupsIcon fontSize="small" /> },
  { label: "Dashboard", url: "/dashboard", icon: <AdminPanelSettingsIcon fontSize="small" /> },
  { label: "Documents", url: "/documents", icon: <GroupsIcon fontSize="large" /> },
  // { label: "Boosters", url: "/boosters", icon: <SportsIcon fontSize="large" /> },
  // { label: "Sponsors", url: "/sponsors" },
];

const NavigationMenu = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { isLg } = useMediaQueries();
  const navigate = useNavigate();
  const { isAuthenticated } = useRoleCheck();
  const handleOpen = () => {
    setOpenMenu(true);
  };
  const handleClose = () => {
    setOpenMenu(false);
  };
  const handleSignOut = () => {
    signOutUser().then(() => {
      navigate("/");
      handleClose();
    });
  };
  const handleSignIn = () => {
    navigate("/authentication/sign-in");
    handleClose();
  };
  return (
    <>
      {isLg ? (
        <NavigationListItems menuItems={menuItems} handleClose={handleClose} navListType="navigation-menu" />
      ) : (
        <>
          <StyledMenuIconButton onClick={handleOpen} size="large" edge="start" aria-label="menu">
            <MenuIcon fontSize="large" />
          </StyledMenuIconButton>
          <StyledDrawerMenu open={openMenu} anchor={"right"} onClose={handleClose}>
            <Stack direction="column" justifyContent="space-between">
              <StyledCloseIconButton variant="square" onClick={handleClose} color="primary.main" aria-label="exit menu">
                <CloseIcon fontSize="large" />
              </StyledCloseIconButton>
            </Stack>
            <OverlandLogo textColor="primary.main" noHover={true} />
            <NavigationListItems menuItems={menuItems} handleClose={handleClose} navListType="navigation-menu" />
            <ButtonBlock sx={{ paddingInline: "1rem" }}>
              {isAuthenticated ? (
                <Button onClick={handleSignOut} variant="contained" color="error">
                  Sign Out
                </Button>
              ) : (
                <Button onClick={handleSignIn} variant="contained" color="secondary">
                  Sign In
                </Button>
              )}
            </ButtonBlock>
            <Divider sx={{ marginInline: "1rem" }} />
            <StyledMenuContentBox>
              <ContactUs sx={{ mb: "2rem" }} />
              <Socials dataTypeDevice="footer" />
            </StyledMenuContentBox>
          </StyledDrawerMenu>
        </>
      )}
    </>
  );
};

export default NavigationMenu;
