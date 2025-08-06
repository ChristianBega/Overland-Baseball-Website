// React and Hooks
import React from "react";
import { Slide, useScrollTrigger } from "@mui/material";
// Components
import OverlandLogo from "./Logo";
import Account from "./Account";
import NavigationMenu from "./NavigationMenu";
// Custom Hooks
import useMediaQueries from "../../../utils/helpers/useMediaQueries.utils";
// Styles
import { StyledAppBar, StyledToolbar } from "./Navigation.styles";

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navigation = (props) => {
  const { isLg } = useMediaQueries();

  return (
    <>
      <HideOnScroll {...props}>
        <StyledAppBar id="navigation" position="sticky" component="nav" isTransparent={props.isTransparent}>
          <StyledToolbar>
            <OverlandLogo />
            <NavigationMenu />
            {isLg && <Account />}
          </StyledToolbar>
        </StyledAppBar>
      </HideOnScroll>
    </>
  );
};

export default Navigation;
