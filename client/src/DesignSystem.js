import { createTheme } from "@mui/material";
// https://mui.com/material-ui/customization/theme-components/

export const mainTheme = createTheme(
  {
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
            // background: "rgb(9,31,64)",
            background: "linear-gradient(153deg, rgba(9,31,64,0.6487119437939111) 51%, rgba(0,154,78,0.6510538641686183) 98%)",
          },
        },
      },

      MuiTypography: {
        styleOverrides: {
          root: {
            // fontWeight: "bold",
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
              transform: "scale(.9)",
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
            // minHeight: "170px",
          },
        },
      },
      // MuiTableRow: {
      //   styleOverrides: {
      //     root: {
      //     },
      //   },
      // },
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
        fontFamily: "'Alfa Slab One', cursive",
        letterSpacing: ".3rem",
        fontSize: "58px",
        lineHeight: "62px",
        fontWeight: "800",
        textShadow: "0 0 2px #c3c1c1a0",
      },
      h2: {
        fontFamily: "'Alfa Slab One', cursive",
        letterSpacing: ".3rem",
        fontSize: "48px !important",
        lineHeight: "52px !important",
        fontWeight: "700 !important",
      },
      h2Small: {
        fontFamily: "'Alfa Slab One', cursive",
        letterSpacing: ".3rem",
        fontSize: "42px !important",
        lineHeight: "52px !important",
        fontWeight: "700 !important",
      },
      h3: {
        fontFamily: "'Alfa Slab One', cursive",
        fontSize: "32px",
        lineHeight: "42px",
        fontWeight: "700",
        letterSpacing: ".3rem",
      },
      h4: {
        fontFamily: "Figtree",
        fontSize: "28px",
        lineHeight: "32px",
        fontWeight: "600",
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
        color: "#21c067",
        fontFamily: "Work Sans",
        lineHeight: "18px",
        fontSize: "20px",
        width: "100%",
      },
      linkTextMobile: {
        color: "#283F76",
        fontFamily: "Work Sans",
        lineHeight: "22px",
        fontSize: "28px",
        width: "100%",
      },

      // MuiTypography: {
      //     styleOverrides: {
      //         root: {
      //             fontWeight: "800",
      //         },
      //     },
      // },
    },
  }
  // shadows: {},
);
