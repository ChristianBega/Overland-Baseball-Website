import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { mainTheme } from "./DesignSystem";
import { ThemeProvider } from "@mui/material";

// Animation Route - for adding animations with framer motion.
import AnimationRoutes from "./components/framerMotion/AnimationRoutes.component";

function App() {
  return (
    <>
      <ThemeProvider theme={mainTheme}>
        <Router>
          <AnimationRoutes />
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
