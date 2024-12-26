import { AppBar, Slide, Toolbar, useScrollTrigger } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import useMediaQueries from "../../setup/utils/helpers/useMediaQueries.utils";
import OverlandLogo from "./logo.component";
import Account from "./components/account/account";
import NavigationMenu from "./components/navigationMenu/navigationMenu";

const StyledToolbar = styled(Toolbar)(({ theme, currentTheme }) => ({
  display: "flex",
  justifyContent: "space-between",
  color: theme.palette.text.primary,
  background: currentTheme === "dark" ? theme.palette.secondary.main : theme.palette.primary.main,

  padding: theme.spacing(2, 2),
  [theme.breakpoints.up("lg")]: {
    padding: theme.spacing(2, 4),
  },
}));

const HideOnScroll = (props) => {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};
const Navigation = (props) => {
  const { isLg } = useMediaQueries();

  return (
    <HideOnScroll {...props}>
      <AppBar id="navigation" position="sticky" component="nav">
        <StyledToolbar>
          {isLg && <OverlandLogo />}
          <NavigationMenu />
          {!isLg && <OverlandLogo />}
          <Account />
        </StyledToolbar>
      </AppBar>
    </HideOnScroll>
  );
};

export default Navigation;
 