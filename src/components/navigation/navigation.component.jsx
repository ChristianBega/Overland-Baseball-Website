import { useState } from "react";

// Mui components
import { AppBar, Box } from "@mui/material";
import DesktopNavigation from "./desktopNavigation.component";
import MobileNavigation from "./mobileNavigation.component";

// const StyledNavigation = styled(AppBar)(({ theme }) => ({}));

// const StyledToolbar = styled(Toolbar)(({ theme }) => ({
//   display: "flex",
//   justifyContent: "space-between",
//   textAlign: "center",
//   // spacing: theme.spacing(19),
//   padding: theme.spacing(0, 3.5), // 0px 14px
//   color: theme.palette.text.primary,
//   background: theme.palette.primary.main,
// }));

export default function Navigation() {
  // const [openMenu, setOpenMenu] = useState(false);

  // const handleOpen = () => {
  //   setOpenMenu(true);

  //   // setAnchorEl(null);
  // };
  // const handleClose = () => {
  //   setOpenMenu(false);
  //   // setAnchorEl(null);
  // };

  return (
    <Box component="header" className="main-header" sx={{ flexGrow: 1 }}>
      <AppBar component="nav" position="static">
        <MobileNavigation />
        <DesktopNavigation />
      </AppBar>
    </Box>
  );
}
