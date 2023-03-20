// Mui components
import { AppBar, Box } from "@mui/material";
// Custom Components
import DesktopNavigation from "./desktopNavigation.component";
import MobileNavigation from "./mobileNavigation.component";

export default function Navigation() {
  return (
    <Box component="header" className="main-header" sx={{ flexGrow: 1 }}>
      <AppBar component="nav" position="static">
        <MobileNavigation />
        <DesktopNavigation />
      </AppBar>
    </Box>
  );
}
