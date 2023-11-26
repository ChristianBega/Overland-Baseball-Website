import { BrowserRouter as Router } from "react-router-dom";
import { mainTheme } from "./DesignSystem";
import { ThemeProvider } from "@mui/material";

// Animation Route - for adding animations with framer motion.
import Unauthorized from "./setup/routes/unauthorized/unauthorized.routes";
import Navigation from "./components/navigation/navigation.component";
import FooterNavigation from "./components/navigation/footer/footerNavigation.component";

function App() {
  return (
    <>
      <ThemeProvider theme={mainTheme}>
        <Router>
          <Navigation />
          <Unauthorized />
          {/* Error with "react does not recognize show label" - can't find it but somewhere in footer */}
          <FooterNavigation />
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
