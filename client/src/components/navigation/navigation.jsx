// React and Hooks
import React from "react";
import { useScrollTrigger } from "@mui/material";
// Material UI Components
import { AppBar, Slide } from "@mui/material";
// Components
import OverlandLogo from "./logo.component";
import Account from "./components/account/account";
import NavigationMenu from "./components/navigationMenu/navigationMenu";
// Custom Hooks
import useMediaQueries from "../../setup/utils/helpers/useMediaQueries.utils";
// Styles
import { StyledToolbar } from "./styles/index.styles";


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
