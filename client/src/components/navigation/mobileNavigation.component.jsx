import { useState } from "react";
// Icons
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

// Mui components
import { IconButton, Drawer, Toolbar, styled, Box } from "@mui/material";
import NavigationListItems from "./navigationListItems.component";

//Logo
import OverlandLogo from "./logo.component";
// import Account from "./account.component";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  color: theme.palette.text.primary,
  background: theme.palette.primary.main,
  [theme.breakpoints.up("lg")]: {
    display: "none",
  },
  [theme.breakpoints.down("lg")]: {
    padding: theme.spacing(4, 8),
  },
}));
const StyledDrawerMenu = styled(Drawer)(({ theme }) => ({
  background: "rgba(0, 0, 0, 0.7)",
  width: "100%",
  [theme.breakpoints.up("md")]: {
    width: "30%",
  },
}));

export default function MobileNavigation() {
  const [openMenu, setOpenMenu] = useState(false);

  const handleOpen = () => {
    setOpenMenu(true);
  };
  const handleClose = () => {
    setOpenMenu(false);
  };

  return (
    <>
      <StyledToolbar>
        <IconButton onClick={handleOpen} size="large" edge="start" color="inherit" aria-label="menu">
          <MenuIcon fontSize="large" />
        </IconButton>
        <StyledDrawerMenu open={openMenu} anchor={"left"} onClose={handleClose}>
          <IconButton sx={{ display: "block" }} onClick={handleClose} color="primary.main" aria-label="exit menu">
            <CloseIcon fontSize="large" />
          </IconButton>
          <NavigationListItems handleClose={handleClose} />
        </StyledDrawerMenu>

        <OverlandLogo sx={{ flexGrow: 1 }} />
        {/* <Account /> */}
        {/* Placeholder box for account log - remove box & uncomment account when auth is set up */}
        <Box sx={{ width: "35px", height: "35px" }}></Box>
      </StyledToolbar>
    </>
  );
}
