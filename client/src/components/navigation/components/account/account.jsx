import React, { useState } from "react";
// MUI components
import { Box, IconButton } from "@mui/material";
// Icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import SignInIcon from "@mui/icons-material/Login";
import SignUpIcon from "@mui/icons-material/PersonAdd";
import SignOutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
// Components
import NavigationListItems from "../navigationListItems/navigationListItems";
import { StyledDrawerMenu } from "../../styles/index.styles";
// Utils
import useMediaQueries from "../../../../setup/utils/helpers/useMediaQueries.utils";

const menuItems = [
  { label: "Sign In", url: "/authentication/sign-in", icon: <SignInIcon /> },
  { label: "Sign Up", url: "/authentication/sign-up", icon: <SignUpIcon /> },
  { label: "Sign Out", url: "/", icon: <SignOutIcon /> },
  { label: "Settings", url: "/settings", icon: <SettingsIcon /> },
  // { label: "Theme Showcase", url: "/theme-showcase", icon: <SettingsIcon /> },
];

const styles = {
  closeButton: {
    marginLeft: "auto",
  },
  userSupportBox: {
    marginBlock: "2rem",
    textAlign: "center",
  },
};

const Account = () => {
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
      <IconButton size="large" onClick={handleOpen}>
        <AccountCircleIcon color="secondary" />
      </IconButton>
      <StyledDrawerMenu open={openMenu} anchor="left" onClose={handleClose}>
        <IconButton sx={styles.closeButton} variant="square" onClick={handleClose} color="primary" aria-label="exit menu">
          <CloseIcon fontSize="large" />
        </IconButton>

        <NavigationListItems menuItems={menuItems} handleClose={handleClose} navListType="account-menu" />
        <Box sx={styles.userSupportBox}>{!isLg && <>**user account support here**</>}</Box>
      </StyledDrawerMenu>
    </>
  );
};

export default Account;
