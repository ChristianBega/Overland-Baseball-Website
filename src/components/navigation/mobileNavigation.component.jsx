import { useState } from "react";
// Icons
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

// Mui components
import { Typography, IconButton, Button, Drawer, Toolbar, styled } from "@mui/material";
import NavigationListItems from "./navigationListItems.component";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  textAlign: "center",
  // spacing: theme.spacing(19),
  padding: theme.spacing(1.75, 3.5), // 7px 14px
  color: theme.palette.text.primary,
  background: theme.palette.primary.main,
  [theme.breakpoints.up("lg")]: {
    display: "none",
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

    // setAnchorEl(null);
  };
  const handleClose = () => {
    setOpenMenu(false);
    // setAnchorEl(null);
  };

  return (
    <>
      <StyledToolbar>
        <IconButton onClick={handleOpen} size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <StyledDrawerMenu open={openMenu} anchor={"left"} onClose={handleClose}>
          <IconButton onClick={handleClose} color="primary.main" aria-label="exit menu">
            <CloseIcon />
          </IconButton>
          <NavigationListItems setOpenMenu={setOpenMenu} openMenu={openMenu} handleClose={handleClose} />
        </StyledDrawerMenu>
        <Typography typography="h3" sx={{ flexGrow: 1 }}>
          Overland Baseball
        </Typography>
        <Button size="box">Login</Button>
      </StyledToolbar>
    </>
  );
}
