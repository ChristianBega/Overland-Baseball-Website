import { createTheme } from "@mui/material";

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
      MuiTypography: {
        styleOverrides: {
          root: {
            fontWeight: "bold",
          },
        },
      },
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
            width: "90px",
          },
          // sizeMedium: {
          //   lineHeight: "24px",
          //   fontSize: "18px",
          //   padding: "10px 16px",
          // },
          // sizeLarge: {
          //   lineHeight: "26px",
          //   fontSize: "22px",
          //   padding: "10px 12px",
          // },

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
      // MuiTableCell: {
      //   styleOverrides: {
      //     root: {
      //       // minHeight: "100px"
      //       padding: "2rem",
      //     },
      //   },
      // },
      // MuiListItemText: {
      //   styleOverrides: {
      //     root: {},
      //   },
      // },
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
    },
    // shadows: {},
    typography: {
      fontFamily: "Work Sans",
      h1: {
        fontFamily: "Figtree",
        fontSize: "58px",
        lineHeight: "62px",
        fontWeight: "800",
      },
      h2: {
        fontFamily: "Figtree",
        fontSize: "48px",
        lineHeight: "52px",
        fontWeight: "700",
      },
      h3: {
        fontFamily: "Figtree",
        fontSize: "38px",
        lineHeight: "42px",
        fontWeight: "700",
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
        color: "#fff",
        fontFamily: "Work Sans",
        lineHeight: "18px",
        fontSize: "20px",
        width: "100%",
      },
      linkTextMobile: {
        fontFamily: "Work Sans",
        lineHeight: "22px",
        fontSize: "22px",
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
