// Mui components
import { AppBar, Slide, useScrollTrigger } from "@mui/material";
// Custom Components
import DesktopNavigation from "./desktopNavigation.component";
import MobileNavigation from "./mobileNavigation.component";
// import { useContext } from "react";
// import { UserContext } from "../../setup/context/user.context";

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

export default function Navigation(props) {
  // const { currentUserProfile } = useContext(UserContext);

  return (
    <HideOnScroll {...props}>
      <AppBar id="navigation" position="sticky" component="nav">
        <MobileNavigation />
        <DesktopNavigation />
      </AppBar>
    </HideOnScroll>
  );
}
