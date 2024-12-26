import { Box, Drawer, IconButton, styled } from "@mui/material";
import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// Icons
// import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SignInIcon from "@mui/icons-material/Login";
import SignUpIcon from "@mui/icons-material/PersonAdd";
import SignOutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import NavigationListItems from "../navigationListItems/navigationListItems";
import { StyledDrawerMenu } from "../../styles/index.styles";
import useMediaQueries from "../../../../setup/utils/helpers/useMediaQueries.utils";

// const StyledDrawerMenu = styled(Drawer)(({ theme }) => ({
//   background: "rgba(0, 0, 0, 0.7)",
//   width: "100%",
//   [theme.breakpoints.up("md")]: {
//     width: "30%",
//   },
// }));

const menuItems = [
  { label: "Sign In", url: "/authentication/sign-in", icon: <SignInIcon /> },
  { label: "Sign Up", url: "/authentication/sign-up", icon: <SignUpIcon /> },
  { label: "Sign Out", url: "/", icon: <SignOutIcon /> },
  { label: "Settings", url: "/settings", icon: <SettingsIcon /> },
];

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
        <IconButton sx={{ marginLeft: "auto" }} variant="square" onClick={handleClose} color="primary" aria-label="exit menu">
          <CloseIcon fontSize="large" />
        </IconButton>
        {/* {menuItems.map(({ label, url, icon }) => (
          <Link key={label} to={url} style={{ display: "flex", alignItems: "center" }}>
            {icon}
            {label}
          </Link>
        ))} */}
        <NavigationListItems menuItems={menuItems} handleClose={handleClose} navListType="account-menu" />
        <Box sx={{ marginBlock: "2rem", textAlign: "center" }}>
          {!isLg && (
            <>
              {/* <Socials dataTypeDevice="mobile" /> */}
              **user account support here**
              {/* <ContactUs /> */}
            </>
          )}
        </Box>
      </StyledDrawerMenu>
    </>
  );
};

export default Account;
