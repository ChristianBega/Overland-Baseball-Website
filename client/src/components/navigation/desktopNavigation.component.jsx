// Mui components
import { Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";

// Components
import NavigationListItems from "./navigationListItems.component";
import OverlandLogo from "./logo.component";
import Account from "./account.component";
import { useContext } from "react";
import { ThemeToggleContext } from "../../setup/context/components/themeToggler.context";

const StyledToolbar = styled(Toolbar)(({ theme, currentTheme }) => ({
  display: "none",
  justifyContent: "space-between",
  color: theme.palette.text.primary,
  background: currentTheme === "dark" ? theme.palette.secondary.main : theme.palette.primary.main,
  [theme.breakpoints.up("lg")]: {
    display: "flex",
    padding: theme.spacing(2, 4),
  },
}));
export default function DesktopNavigation() {
  const { currentTheme } = useContext(ThemeToggleContext);
  return (
    <>
      <StyledToolbar currentTheme={currentTheme}>
        <OverlandLogo />
        <NavigationListItems />
        <Account />
      </StyledToolbar>
    </>
  );
}
