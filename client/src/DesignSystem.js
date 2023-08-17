import { createTheme } from "@mui/material";
// https://mui.com/material-ui/customization/theme-components/

export const mainTheme = createTheme({
  spacing: (factor) => `${0.25 * factor}rem`,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
    },
  },
  components: {
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: "#b05633",
          marginTop: 3,
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          background: "linear-gradient(153deg, rgba(9,31,64,0.6487119437939111) 51%, rgba(0,154,78,0.6510538641686183) 98%)",
          // background: "linear-gradient(153deg, rgba(9,31,64,0.3487119437939111) 51%, rgba(0,154,78,0.3510538641686183) 98%) !important",
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent !important",
          // opacity: -0.,
          // display: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#FAF9F6",
          background: "#009A4E",
          ":hover": {
            background: "#283F76",
            cursor: "pointer",
            transform: "scale(1.1)",
          },
          ":focus-visible": "",
          transition: "all .3s ease-In-Out",
        },
        sizeSmall: {
          lineHeight: "22px",
          fontSize: "18px",
          padding: "10px 12px",
          width: "90px",
        },

        // Medium toggle buttons
        sizeMedium: {
          lineHeight: "22px",
          fontSize: "18px",
          padding: "12px 24px",
          width: "60%",
          minHeight: "30px",
        },
        // Large toggle buttons
        sizeLarge: {
          lineHeight: "26px",
          fontSize: "18px",
          padding: "18px 28px",
          width: "80%",
          minHeight: "40px",
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
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: 12,
          color: "#091F40",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          input: {
            color: "#283F76",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          ":hover": {
            background: "rgba(255,255,255,.2)",
            cursor: "pointer",
            transform: "scale(1.1)",
          },
          ":focus-visible": "",
          transition: "all .3s ease-In-Out",
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: "1rem",
          "@media (min-width: 600px)": {
            padding: "2rem",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          color: "#283F76 !important",
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
    accent: {
      accentOne: "rgba(9,31,64,.8)",

      accentTwo: "rgba(0,154,78,.5)",
    },
    text: {
      primary: "#F3F4F6",
    },
    borders: {
      primary: "#c3c1c1a0",
    },
  },
  typography: {
    fontFamily: "Work Sans",
    h1: {
      color: "#091F40",
      textAlign: "center",
      fontFamily: "Roboto Slab, serif",
      textTransform: "uppercase",
      letterSpacing: ".2rem",
      fontSize: "30px",
      lineHeight: "40px",
      marginBlock: "2rem",
      "@media (min-width: 600px)": {
        fontSize: "40px ",
        lineHeight: "50px ",
      },
      "@media (min-width: 900px)": {
        fontSize: "55px ",
        lineHeight: "65px ",
      },
    },
    h2: {
      color: "#091F40",
      textTransform: "uppercase",
      fontFamily: "Roboto Slab, serif",
      letterSpacing: ".2rem",
      fontWeight: "400",
      fontSize: "28px",
      marginBlock: "1rem",
      "@media (min-width: 600px)": {
        fontSize: "34px ",
        lineHeight: "36px ",
      },
      "@media (min-width: 900px)": {
        fontSize: "42px ",
        lineHeight: "47px ",
      },
    },
    h3: {
      color: "#fff",
      textAlign: "center",
      marginBlock: "1rem",
      fontFamily: "Roboto Slab, serif",
      fontSize: "18px",
      fontWeight: "600",
      letterSpacing: ".1rem",
      "@media (min-width: 600px)": {
        fontSize: "28px ",
        lineHeight: "36px ",
      },
    },
    p: {
      display: "inline",
      color: "#091F40 !important",
      "@media (min-width: 900px)": {
        fontSize: "18px ",
      },
    },
    small: {
      color: "#091F40",
      fontSize: "14px",
      display: "flex",
      gap: ".1rem",
    },

    linkText: {
      color: "#21c067",
      ":hover": {
        color: "#F3F4F6",
        cursor: "pointer",
        transform: "scale(1.1)",
      },
      ":focus-visible": "",
    },

    linkTextDesktop: {
      color: "#21c067",
      fontFamily: "Work Sans",
      lineHeight: "18px",
      fontSize: "20px",
      width: "100%",
      textDecoration: "none !important",
      ":hover": {
        color: "#F3F4F6",
        cursor: "pointer",
        transform: "scale(1.1)",
      },
      ":focus-visible": "",
      transition: "all .3s ease-In-Out",
    },
    linkTextMobile: {
      textDecoration: "none !important",
      color: "#283F76",
      fontFamily: "Work Sans",
      lineHeight: "22px",
      fontSize: "28px",
      width: "100%",
      ":hover": {
        color: "#010B1F",
        cursor: "pointer",
        transform: "scale(1.1)",
      },
      ":focus-visible": "",
      transition: "all .3s ease-In-Out",
    },
  },
});
