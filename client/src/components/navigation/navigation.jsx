// React and Hooks
import React from "react";
import { Box, Slide, useScrollTrigger } from "@mui/material";
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
import { useTheme } from "@emotion/react";

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
  const location = useLocation();
  const isHeroPage = location.pathname === "/";
  const theme = useTheme();
  return (
    <>
      <HideOnScroll {...props}>
        <AppBar
          id="navigation"
          position="sticky"
          component="nav"
          sx={{
            background: "radial-gradient(circle, rgba(8,41,112,1) 0%, rgba(9,31,64,1) 100%)",
            backdropFilter: "blur(10px)",
            // borderRadius: "100px",
            // top: "2rem",
            // left: "50%",
            padding: "1rem",
            // maxWidth: { xs: "90%", xl: "1300px" },
            boxShadow: "0 0 10px 5px rgba(0, 0, 0, .4)",
            [theme.breakpoints.up("lg")]: {
              padding: "1.5rem",
            },
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
      {!isHeroPage && <Box sx={{ height: "calc(2rem + 49px)" }} />}
    </>
  );
};

export default Navigation;
