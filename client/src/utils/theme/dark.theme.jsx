export const darkTheme = {
  palette: {
    primary: {
      dark: "#4CBB17", // Lighter green
      light: "#4CD88A",
      main: "#009A4E",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#002050", // Darker blue
      light: "#4B6DB3",
      dark: "#091F40",
      contrastText: "#ffffff",
    },
    accent: {
      accentOne: "rgba(75, 109, 179, 0.8)", // Lighter blue
      accentTwo: "rgba(33, 192, 103, 0.5)", // Lighter green
    },
    text: {
      primary: "#ffffff", // White text for primary
      secondary: "#0017eb", // Light purple for secondary
      disabled: "#ffffff40",
    },
    background: {
      default: "radial-gradient(circle, rgba(1, 38, 93, 0.875) 0%, rgba(0,46,116,0.9288300304878049) 22%, rgba(6,29,79,1) 69%)",
    },
    borders: {
      primary: "#ffffff40",
    },
    mode: "dark",
  },

  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#ffffff",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          input: {
            color: "hsl(0, 0%, 80%)",
            "& svg": {
              color: "hsl(0, 0%, 80%)",
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        // outlined: {
        //   border: "2px solid purple",
        // },
        // outlinedPrimary: {
        //   border: "2px solid green", // Specific style for outlined primary buttons
        // },
        outlinedSecondary: {
          color: "#fff",
          border: "1px solid #fff",
          "&:hover": {
            border: "1px solid hsl(0, 0%, 60%)",
            background: "rgba(151, 152, 152, 0.08)",
            boxShadow: "0px 0px 10px 0px rgba(255, 255, 255, 0.6)",
          },
        },
        containedSecondary: {
          // color: "#fff",
          // border: "1px solid #fff",
          "&:hover": {
            boxShadow: "0px 0px 10px 0px rgba(90, 136, 227, 0.6)",
            // border: "1px solid hsl(0, 0%, 60%)",
            // background: "rgba(151, 152, 152, 0.08)",
            // boxShadow: "0px 0px 10px 0px rgba(255, 255, 255, 0.6)",
          },
        },
        root: {
          ":hover": {
            cursor: "pointer",
            boxShadow: "0px 0px 10px 0px #00ff2fce",
          },
          transition: "all .3s ease-In-Out",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "#ffffff40",
        },
      },
    },
  },
};
