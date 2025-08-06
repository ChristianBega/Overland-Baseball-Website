import React, { useState } from "react";
// MUI components
import { Button } from "@mui/material";
// Icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
// import SignInIcon from "@mui/icons-material/Login";
// import SignUpIcon from "@mui/icons-material/PersonAdd";
// import SignOutIcon from "@mui/icons-material/Logout";
// import SettingsIcon from "@mui/icons-material/Settings";
// Components
import NavigationListItems from "./NavigationListItems";
import { StyledDrawerMenu } from "../styles/index.styles";
import FooterLogo from "./FooterLogo";
import ButtonBlock from "../../ui/components/ButtonBlock";
// Styled Components
import { StyledAccountIconButton, StyledAccountCloseButton } from "./Account.styles";
// Utils
import { useRoleCheck } from "../../../hooks/useRoleCheck";
import { useNavigate } from "react-router-dom";
import { signOutUser } from "../../auth/utils/authUtils";

const menuItems = [
  // { label: "Sign In", url: "/authentication/sign-in", icon: <SignInIcon /> },
  // { label: "Sign Up", url: "/authentication/sign-up", icon: <SignUpIcon /> },
  // { label: "Sign Out", url: "/", icon: <SignOutIcon /> },
  // { label: "Settings", url: "/settings", icon: <SettingsIcon /> },
  // { label: "Theme Showcase", url: "/theme-showcase", icon: <SettingsIcon /> },
];

const Account = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { isAuthenticated } = useRoleCheck();
  const navigate = useNavigate();

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
      <StyledAccountIconButton size="large" onClick={handleOpen}>
        <AccountCircleIcon color="text.secondary2" />
      </StyledAccountIconButton>
      <StyledDrawerMenu open={openMenu} anchor="right" onClose={handleClose}>
        <StyledAccountCloseButton variant="square" onClick={handleClose} color="primary" aria-label="exit menu">
          <CloseIcon fontSize="large" />
        </StyledAccountCloseButton>
        <FooterLogo textColor="primary.main" noHover={true} />
        <NavigationListItems menuItems={menuItems} handleClose={handleClose} navListType="account-menu" />
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
      </StyledDrawerMenu>
    </>
  );
};

export default Account;
