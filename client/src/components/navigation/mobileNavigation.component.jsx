import { useContext, useState } from "react";
// Icons
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

// Mui components
import { IconButton, Drawer, Toolbar, styled } from "@mui/material";
import NavigationListItems from "./navigationListItems.component";

//Logo
import OverlandLogo from "./logo.component";
import Account from "./account.component";
import { ThemeToggleContext } from "../../setup/context/components/themeToggler.context";
import { useTheme } from "@emotion/react";

const StyledToolbar = styled(Toolbar)(({ theme, currentTheme }) => ({
  display: "flex",
  justifyContent: "space-between",
  color: theme.palette.text.primary,
  background: currentTheme === "dark" ? theme.palette.secondary.main : theme.palette.primary.main,
  [theme.breakpoints.up("lg")]: {
    display: "none",
  },
  [theme.breakpoints.down("lg")]: {
    padding: theme.spacing(2),
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
  const { currentTheme } = useContext(ThemeToggleContext);
  const theme = useTheme();

  const handleOpen = () => {
    setOpenMenu(true);
  };
  const handleClose = () => {
    setOpenMenu(false);
  };

  return (
    <>
      <StyledToolbar currentTheme={currentTheme}>
        <IconButton onClick={handleOpen} size="large" edge="start" aria-label="menu">
          <MenuIcon sx={{ color: theme.palette.text.secondary }} fontSize="large" />
        </IconButton>
        <StyledDrawerMenu open={openMenu} anchor={"left"} onClose={handleClose}>
          <IconButton sx={{ display: "block" }} onClick={handleClose} color="primary.main" aria-label="exit menu">
            <CloseIcon fontSize="large" />
          </IconButton>
          <NavigationListItems handleClose={handleClose} />
        </StyledDrawerMenu>

        <OverlandLogo sx={{ flexGrow: 1 }} />
        <Account />
      </StyledToolbar>
    </>
  );
}
