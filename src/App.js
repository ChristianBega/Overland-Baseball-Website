import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AnimationRoutes from "./components/framerMotion/AnimationRoutes.component";
import { mainTheme } from "./DesignSystem";
import { ThemeProvider, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

function App() {
  const theme = useTheme();
  return (
    <>
      <ThemeProvider theme={mainTheme}>
        <Router>
          <Typography component="h1" variant="h1">
            Hello world
          </Typography>
          <Typography component="h2" variant="h2">
            Hello world
          </Typography>
          <Typography component="h3" variant="h3">
            Hello world
          </Typography>
          <Typography component="h4" variant="h4">
            Hello world
          </Typography>
          <Typography component="p" variant="p" typography="bodyTextLg">
            Hello world
          </Typography>
          <Typography component="p" variant="p" typography="bodyTextSm">
            Hello world
          </Typography>
          <AnimationRoutes />
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
