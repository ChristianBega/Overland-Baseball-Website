import { useState } from "react";
// Icons
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
// Mui components
import { IconButton, Drawer, Toolbar, styled } from "@mui/material";
import NavigationListItems from "./navigationListItems.component";
import OverlandLogo from "./logo.component";
import Account from "./account.component";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  // padding: theme.spacing(2, 8), // 7px 14px
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
    width: "50%",
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
        <IconButton onClick={handleOpen} size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon fontSize="large" />
        </IconButton>
        <StyledDrawerMenu open={openMenu} anchor={"left"} onClose={handleClose}>
          <IconButton onClick={handleClose} color="primary.main" aria-label="exit menu">
            <CloseIcon />
          </IconButton>
          <NavigationListItems setOpenMenu={setOpenMenu} openMenu={openMenu} handleClose={handleClose} />
        </StyledDrawerMenu>

        <OverlandLogo sx={{ flexGrow: 1 }} />
        <Account />
      </StyledToolbar>
    </>
  );
}
