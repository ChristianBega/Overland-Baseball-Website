import { createTheme } from "@mui/material";

export const mainTheme = createTheme({
  breakpoints: {
    values: {},
  },
  components: {},
  palette: {
    primary: {
      main: "#091F40",
      light: "#283F76",
      dark: "#010B1F",
      contrastText: "",
    },
    secondary: {
      main: "#009A4E",
      light: "#21c067",
      dark: "#007f3b",
      contrastText: "",
    },
    text: {
      primary: "#201F40",
    },
  },
  shadows: {},
  typography: {
    fontFamily: "Work Sans",
    h1: {
      fontFamily: "Figtree",
      fontSize: "58px",
      lineHeight: "62px",
    },
    h2: {
      fontFamily: "Figtree",
      fontSize: "48px",
      lineHeight: "52px",
    },
    h3: {
      fontFamily: "Figtree",
      fontSize: "38px",
      lineHeight: "42px",
    },
    h4: {
      fontFamily: "Figtree",
      fontSize: "28px",
      lineHeight: "32px",
    },
    bodyTextLg: {
      fontFamily: "Work Sans",
      fontSize: "18px",
      lineHeight: "22px",
    },
    bodyTextSm: {
      fontFamily: "Work Sans",
      fontSize: "16px",
      lineHeight: "18px",
    },
  },
});
