// React and Hooks
import React from "react";
import { Box, useScrollTrigger } from "@mui/material";
// Material UI Components
import { AppBar } from "@mui/material";
// Components
import OverlandLogo from "./logo.component";
import Account from "./components/account/account";
import NavigationMenu from "./components/navigationMenu/navigationMenu";
// Custom Hooks
import useMediaQueries from "../../setup/utils/helpers/useMediaQueries.utils";
// Styles
import { StyledToolbar } from "./styles/index.styles";
import { useLocation } from "react-router-dom";

const HideOnScroll = (props) => {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    style: {
      ...children.props.style,
      opacity: trigger ? 0 : 1,
      transform: `translateX(-50%) translateY(${trigger ? -100 : 0}px)`,
      transition: "transform 0.3s ease, opacity 0.3s ease",
    },
  });
};

const Navigation = (props) => {
  const { isLg } = useMediaQueries();
  const location = useLocation();
  const isHeroPage = location.pathname === "/";
  return (
    <>
      <HideOnScroll {...props}>
        <AppBar
          id="navigation"
          component="nav"
          sx={{
            // background: "radial-gradient(circle, rgba(8,41,112,.1) 0%, rgba(9,31,64,.1) 100%)",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            borderRadius: "100px",
            top: "2rem",
            left: "50%",
            padding: ".5rem",
            maxWidth: { xs: "90%", xl: "1300px" },
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.15)",
          }}
        >
          <StyledToolbar>
            {isLg && <OverlandLogo />}
            <NavigationMenu />
            {!isLg && <OverlandLogo />}
            <Account />
          </StyledToolbar>
        </AppBar>
      </HideOnScroll>
      {!isHeroPage && <Box sx={{ height: "calc(2rem + 80px)" }} />}
    </>
  );
};

export default Navigation;
