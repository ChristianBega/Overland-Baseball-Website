import { useState } from "react";
// Icons
import MenuIcon from "@mui/icons-material/Menu";

// Mui components
import { AppBar, Box, Toolbar, Typography, IconButton, Button, Drawer, styled } from "@mui/material";
import NavigationListItems from "./navigationListItems.component";

// const StyledNavigation = styled(AppBar)(({ theme }) => ({}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  textAlign: "center",
  // spacing: theme.spacing(19),
  padding: theme.spacing(0, 3.5), // 0px 14px
  color: theme.palette.text.primary,
  background: theme.palette.primary.main,
}));

const StyledDrawerMenu = styled(Drawer)(({ theme }) => ({
  background: "rgba(0, 0, 0, 0.7)",
  width: "100%",
  [theme.breakpoints.up("md")]: {
    width: "50%",
  },
  // zIndex: "-1",
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
    <Box component="header" className="main-header" sx={{ flexGrow: 1 }}>
      <AppBar component="nav" position="static">
        <StyledToolbar>
          <IconButton onClick={handleOpen} size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <StyledDrawerMenu open={openMenu} anchor={"left"} onClose={handleClose}>
            <NavigationListItems setOpenMenu={setOpenMenu} openMenu={openMenu} handleClose={handleClose} />
          </StyledDrawerMenu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Overland Baseball
          </Typography>
          <Button size="box">Login</Button>
        </StyledToolbar>
      </AppBar>
    </Box>
  );
}
