// Mui components
import { AppBar, Slide, useScrollTrigger } from "@mui/material";
// Custom Components
import DesktopNavigation from "./desktopNavigation.component";
import MobileNavigation from "./mobileNavigation.component";

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
  return (
    <HideOnScroll {...props}>
      <AppBar id="navigation" position="sticky" component="nav">
        <MobileNavigation />
        <DesktopNavigation />
      </AppBar>
    </HideOnScroll>
  );
}
