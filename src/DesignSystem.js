import { createTheme } from "@mui/material";

export const mainTheme = createTheme({
  breakpoints: {
    values: {
      md: 900,
      lg: 1200,
    },
  },
  components: {
    // https://mui.com/material-ui/customization/theme-components/
    // name of component
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#FAF9F6",
          background: "#009A4E",
          ":hover": {
            background: "#283F76",
            cursor: "pointer",
          },
          ":focus-visible": "",
          transition: "all .3s ease-In-Out",
        },
        sizeSmall: {
          lineHeight: "22px",
          fontSize: "18px",
          padding: "10px 12px",
          width: "165px",
        },
        sizeMedium: {
          lineHeight: "24px",
          fontSize: "22px",
          padding: "10px 16px",
        },
        sizeLarge: {
          lineHeight: "26px",
          fontSize: "22px",
          padding: "10px 12px",
        },
        sizeBox: {
          borderRadius: "",
          padding: "6px 12px",
        },
        sizeCircle: {
          borderRadius: "50%",
          height: "18px",
          width: "18px",
        },
        fullWidth: {
          maxWidth: "200px",
        },
      },
    },
  },
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
      primary: "#F3F4F6",
    },
  },
  // shadows: {},
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
    linkTextDesktop: {
      color: "#fff",
      fontFamily: "Work Sans",
      lineHeight: "18px",
      fontSize: "20px",
      width: "100%",
    },
    linkTextMobile: {
      color: "red",
      fontFamily: "Work Sans",
      lineHeight: "22px",
      fontSize: "22px",
      width: "100%",
    },
  },
  spacing: (factor) => `${0.25 * factor}rem`,
});
