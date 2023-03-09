import { createTheme } from "@mui/material";

export const mainTheme = createTheme({
  breakpoints: {
    values: {},
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
            background: "#091F40",
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
          borderRadius: "none",
          height: "85px",
          width: "85px",
        },
        sizeCircle: {
          borderRadius: "50%",
          height: "85px",
          width: "85px",
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
  spacing: {},
  // props: {
  //   MuiButton: {
  //     disableRipple: true,
  //   },
  // },
});
