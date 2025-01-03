export const defaultTheme = {
  palette: {
    primary: {
      main: "#091F40",
      light: "#283F76",
      dark: "#010B1F",
    },
    secondary: {
      main: "#4CBB17",
      // main: "#009A4E",
      light: "#21c067",
      dark: "#007f3b",
    },
    accent: {
      accentOne: "rgba(9,31,64,.8)",
      accentTwo: "rgba(0,154,78,.5)",
      accentThree: "#003584",
    },
    text: {
      primary: "#1d1d1d",
      secondary: "#ffffffa8",
      // primary2: "hsl(0, 0%, 100%)",
      // secondary2: "hsl(0, 0%, 70%)",
      // disabled: "hsl(0, 0%, 50%)",
    },
    borders: {
      primary: "#c3c1c1a0",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1400,
      xxl: 1600,
      xxxl: 1800,
      xxxxl: 2000,
    },
  },
  typography: {
    fontFamily: "Work Sans",
    h1: {
      fontFamily: "Anuphan, serif",
      textTransform: "uppercase",
      letterSpacing: ".2rem",
      fontSize: "2.25rem", // 36px
      lineHeight: "2.5rem",
      // marginBlock: "2rem",
      "@media (min-width: 600px)": {
        fontSize: "2.625rem", // 42px
        lineHeight: "3.125rem",
      },
      "@media (min-width: 900px)": {
        fontSize: "3.625rem", // 58px
        lineHeight: "4.0625rem",
      },
    },
    h2: {
      fontWeight: "600",
      textTransform: "uppercase",
      fontFamily: "Anuphan, serif",
      letterSpacing: ".2rem",
      fontSize: "2rem", // 30px
      marginBottom: "1.375rem",
      // marginBlock: "1rem",
      "@media (min-width: 600px)": {
        fontSize: "2.25rem", // 36px
        lineHeight: "2.25rem",
      },
      "@media (min-width: 900px)": {
        fontSize: "2.75rem", // 44px
        lineHeight: "2.9375rem",
      },
    },
    h3: {
      fontWeight: "600",
      fontFamily: "Anuphan, serif",
      fontSize: "1.625rem", // 26px
      // textTransform: "none",
      letterSpacing: ".1rem",
      "@media (min-width: 600px)": {
        fontSize: "1.75rem", // 28px
        lineHeight: "2.25rem",
      },
      "@media (min-width: 900px)": {
        fontSize: "2rem", // 32px
        lineHeight: "2.5rem",
      },
    },
    h4: {
      fontFamily: "Anuphan, serif",
      fontSize: "1.25rem",
      fontWeight: "600",
      letterSpacing: ".1rem",
      lineHeight: "1.75rem", // Adjusted for clarity

      "@media (min-width: 600px)": {
        fontSize: "1.375rem", // 22px
        lineHeight: "2rem",
      },
      "@media (min-width: 900px)": {
        fontSize: "1.75rem", // 28px
        lineHeight: "2.125rem",
      },
    },
    h5: {
      marginBottom: ".5rem",
      fontFamily: "Anuphan, serif",
      fontSize: "1rem", // 16px
      letterSpacing: ".05rem",
      fontWeight: "500",
      "@media (min-width: 600px)": {
        fontSize: "1.125rem", // 18px
        lineHeight: "1.75rem",
      },
      "@media (min-width: 900px)": {
        fontSize: "1.5rem", // 24px
        lineHeight: "1.875rem",
      },
    },
    h6: {
      fontWeight: "500",
      fontFamily: "Anuphan, serif",
      fontSize: "0.875rem", // 14px
      letterSpacing: ".05rem",
      "@media (min-width: 600px)": {
        fontSize: "1rem", // 16px
        lineHeight: "1.25rem",
      },
      "@media (min-width: 900px)": {
        fontSize: "1.25rem", // 20px
        lineHeight: "1.625rem",
      },
    },
    p: {
      fontWeight: "400",
      fontFamily: "Work Sans",
      fontSize: "16px",
      lineHeight: "24px",
      marginBottom: "1.25rem",
      "@media (min-width: 600px)": {
        lineHeight: "24px",
      },
      "@media (min-width: 900px)": {
        fontSize: "18px",
        lineHeight: "28px",
      },
    },

    small: {
      fontSize: "12px",
      display: "flex",
      gap: ".1rem",
    },
    button: {
      fontFamily: "Work Sans",
      fontWeight: "600",
      textTransform: "uppercase",
      fontSize: "14px",
    },
    buttonText: {
      fontFamily: "Work Sans",
      fontWeight: "600",
      fontSize: "14px",
      textTransform: "uppercase",
    },
    subtitle1: {
      fontFamily: "Work Sans",
      fontSize: "16px",
      lineHeight: "26px",
    },
    subtitle2: {
      fontFamily: "Work Sans",
      fontSize: "14px",
      lineHeight: "24px",
    },

    ellipsis: {
      fontSize: "12px",
      gap: ".1rem",
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",
      maxWidth: "80px",
    },

    input: {
      fontFamily: "Work Sans",
      fontSize: "16px",
    },
    formLabel: {
      fontFamily: "Work Sans",
      fontWeight: "500",
      fontSize: "14px",
    },
    formHelperText: {
      fontFamily: "Work Sans",
      fontSize: "12px",
      lineHeight: "18px",
    },
  },
  components: {
    // MuiFormHelperText: {
    //   styleOverrides: {
    //     root: {
    //       color: "#b05633",
    //       marginTop: 3,
    //     },
    //   },
    // },
    MuiList: {
      styleOverrides: {
        root: {
          // paddingInline: "1rem",
          padding: "0",
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          padding: "0",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          ":hover": {
            cursor: "pointer",
          },
          transition: "all .3s ease-In-Out",
          fontWeight: "600",
          borderRadius: "8px",
          letterSpacing: ".025rem",
          textTransform: "capitalize",
          fontFamily: "Work Sans",
        },
        outlinedPrimary: {
          "&:hover": {
            boxShadow: "0px 0px 10px 0px #1642a885",
          },
        },
        outlinedSecondary: {
          border: "1px solid rgba(84, 220, 21, 0.842)",
          "&:hover": {
            background: "rgba(151, 152, 152, 0.08)",
            boxShadow: "0px 0px 10px 0px rgb(79, 216, 16)",
          },
        },
        containedPrimary: {
          "&:hover": {
            boxShadow: "0px 0px 10px 0px #1641a8",
            backgroundColor: "#06234e",
          },
        },
        containedSecondary: {
          color: "#fff",
          "&:hover": {
            boxShadow: "0px 0px 10px 0px rgb(79, 216, 16)",
            backgroundColor: "#4CBB17",
          },
        },
        sizeSmall: {
          fontSize: "14px",
          padding: "6px 12px",
          maxWidth: "100px",
        },
        sizeMedium: {
          fontSize: "16px",
          minWidth: "115px",
          minHeight: "30px",
        },
        sizeLarge: {
          fontSize: "16px",
          minWidth: "150px",
          minHeight: "40px",
        },
        sizeCircle: {
          borderRadius: "50%",
          minHeight: "24px",
          minWidth: "24px",
          padding: "1rem",
          height: "24px",
          width: "24px",
        },
        sizeCard: {
          padding: "4px 10px",
          maxWidth: "150px",
          fontWeight: "300",
          fontSize: "14px",
          lineHeight: "18px",
          "& svg": {
            fontSize: "14px",
          },
          "@media (min-width: 600px)": {
            fontSize: "14px",
            "& svg": {
              fontSize: "1rem",
              color: "red",
            },
          },
          "@media (min-width: 800px)": {
            fontSize: "16px",
            "& svg": {
              fontSize: "1.2rem",
            },
          },
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          // background: "linear-gradient(153deg, rgba(9,31,64,0.6487119437939111) 51%, rgba(0,154,78,0.6510538641686183) 98%)",
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
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "1rem",
          // color: "#091F40",
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#000",
          marginTop: "0px",
          fontSize: "16px",
        },
        filled: {
          top: "-10px",
          "&.MuiInputLabel-shrink": {
            left: "-16px",
            top: "-16px",
            padding: "0px 8px",
            borderRadius: "4px",
          },
        },
        outlined: {
          top: "-10px",
          "&.Mui-focused": {
            top: "5px",
          },
          "&.MuiInputLabel-shrink": {
            top: "0px",
            left: "-3px",
          },
        },
        standard: {
          "&.Mui-focused": {
            fontSize: "16px",
            top: "4px",
          },
          "&.MuiInputLabel-shrink": {
            fontSize: "16px",
            top: "6px",
          },
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          minWidth: "300px",
          width: "100%",
          // maxWidth: "400px",
          // maxHeight: "35px",
          fontSize: "14px",
          padding: "0",

          input: {
            "&.Mui-disabled": {
              cursor: "not-allowed",
            },
            "&.MuiInput-input": {
              paddingLeft: "4px",
            },
            "&.MuiFilledInput-input": {
              paddingTop: "10px",
              paddingLeft: "6px",
            },
            "&.MuiOutlinedInput-input": {
              // Styles for outlined input
              paddingTop: "8px",
              paddingLeft: "8px",
              paddingBottom: "8px",
            },
            "&.MuiInputBase-inputMultiline": {
              paddingTop: "8px",
              paddingLeft: "8px",
              paddingBottom: "8px",
              // maxHeight: "100px",
              border: "1px solid red",
            },
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          "&::placeholder": {
            opacity: 1,
          },
          fontSize: "14px",
        },
        filled: {
          borderLeft: "1px solid red",
          backgroundColor: "#ffffff",
          "&::before": {
            background: "#fe00e9",
            backgroundColor: "#fe00e9",
            backgroundImage: "linear-gradient(153deg, rgba(9,31,64,0.6487119437939111) 51%, rgba(0,154,78,0.6510538641686183) 98%)",
          },
          "&::after": {
            background: "#fe00e9",
            backgroundColor: "#fe00e9",
            backgroundImage: "linear-gradient(153deg, rgba(9,31,64,0.6487119437939111) 51%, rgba(0,154,78,0.6510538641686183) 98%)",
          },
        },
        underline: {
          // borderBottom: "1px solid #ff0000",
          "&::before": {
            borderBottom: "1px solid #ffffff",
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: "14px",
          color: "#000",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          "&.MuiSelect-standard": {
            paddingTop: "6px",
            paddingLeft: "8px", // Adjust for standard select
          },
          "&.MuiSelect-filled": {
            // paddingLeft : "",
            paddingTop: "10px", // Adjust for filled select
            // paddingBottom: "0px",
            paddingLeft: "8px",
            // backgroundColor: "transparent", // Remove extra background
          },
          "&.MuiSelect-outlined": {
            paddingLeft: "8px", // Adjust for outlined select
          },
        },
        icon: {
          top: "50%", // Center the dropdown icon
          transform: "translateY(-50%)",
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          color: "#4CBB17", // Change the color of the icon
          "& .MuiSvgIcon-root": {
            fontSize: "1.5rem", // Adjust the size of the icon
          },
        },
      },
    },

    MuiIconButton: {
      variants: [
        {
          props: { variant: "square" },
          style: {
            maxWidth: "40px",
            borderRadius: "6px",
            display: "block",
            "&:hover": {
              cursor: "pointer",
              transform: "scale(1.1)",
            },
            transition: "all .3s ease-in-out",
          },
        },
      ],
      styleOverrides: {
        root: {
          ":hover": {
            cursor: "pointer",
            transform: "scale(1.1)",
            "& svg": {
              filter: "drop-shadow(0px 0px 10px #00ff2fce)",
              transition: "all .3s ease-In-Out",
            },
          },
          transition: "all .3s ease-In-Out",
        },
        sizeSmall: {
          padding: "8px 8px",
          "& svg": {
            fontSize: "1.3rem",
          },
        },
        sizeMedium: {
          padding: "10px 10px",
          "& svg": {
            fontSize: "1.3rem",
          },
        },
        sizeLarge: {
          "& svg": {
            fontSize: "1.8rem",
          },
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

    MuiLink: {
      variants: [
        {
          props: { variant: "highlighted" },
          style: {
            cursor: "pointer",
            fontWeight: "500",
            textDecoration: "underline",
            fontFamily: "Work Sans",
            letterSpacing: ".07rem",
            fontSize: "16px",
            lineHeight: "24px",
            marginBottom: "1.25rem",
            "@media (min-width: 600px)": {
              lineHeight: "24px",
            },
            "@media (min-width: 900px)": {
              fontSize: "18px",
              lineHeight: "28px",
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          color: "#4CBB17",
          textDecoration: "none",
          fontFamily: "Work Sans",
          lineHeight: "22px",
          fontSize: "22px",
          "&.normal-shadow": {
            ":hover": {
              filter: "drop-shadow(0px 0px 10px #fff)",
              "& svg": {
                filter: "drop-shadow(0px 0px 10px #fff)",
              },
            },
          },
          ":hover": {
            cursor: "pointer",
            color: "#00ff2fce",
            filter: "drop-shadow(0px 0px 10px #00ff2fce)",
            "& svg": {
              filter: "drop-shadow(0px 0px 10px #00ff2fce)",
            },
            // transform: "scale(1.01)",
          },
          transition: "all .3s ease-in-out",
          "@media (min-width: 1200px)": {
            fontSize: "18px",
          },
        },
      },
    },
    MuiCard: {
      variants: [
        {
          props: { variant: "events-main" },
          style: {
            height: "250px",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "radial-gradient(circle, #d9d9d932 0%, #393744 75%, #1A1827 89%, #110F1F 94%, #040112 100%)",
              opacity: 0.5,
            },
          },
        },
        {
          props: { variant: "events-secondary" },
          style: {
            height: "150px",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "radial-gradient(circle, #d9d9d932 0%, #393744 75%, #1A1827 89%, #110F1F 94%, #040112 100%)",
              opacity: 0.5,
            },
          },
        },
        {
          props: { variant: "schedule-view-only" },
          style: {
            marginTop: "0 !important",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            gap: "0",
            "&:not(:first-child)": { marginTop: "2rem" },
            borderRadius: "4px",
          },
        },
      ],
      styleOverrides: {
        root: {
          boxShadow: "0px 0px 5px 0px #626262ab",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          position: "relative",
          padding: "1rem",
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        },
      },
    },
    MuiCardActionArea: {
      styleOverrides: {
        root: {
          gap: ".5rem",
          display: "flex",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 0,
          "&:last-child": {
            paddingBottom: 0,
          },
        },
      },
    },
  },
};
// linkText: {
//   ":hover": {
//     cursor: "pointer",
//     transform: "scale(1.1)",
//   },
// },
// linkTextDesktop: {
//   fontFamily: "Work Sans",
//   lineHeight: "18px",
//   fontSize: "20px",
//   textDecoration: "none",
//   ":hover": {
//     cursor: "pointer",
//     transform: "scale(1.1)",
//   },
//   transition: "all .3s ease-in-out",
// },
// linkTextMobile: {
//   textDecoration: "none",
//   fontFamily: "Work Sans",
//   lineHeight: "22px",
//   fontSize: "28px",
//   ":hover": {
//     cursor: "pointer",
//     transform: "scale(1.1)",
//   },
//   transition: "all .3s ease-in-out",
// },
// MuiGrid: {},
// MuiCard: {
//   // Styles for card components
// },
// MuiTable: {
//   // Styles for tables
// },
// MuiDialog: {
//   // Styles for modals
// },
// MuiAlert: {
//   // Styles for alert messages
// },
// MuiAppBar: {
//   // Styles for the app bar
// },
// MuiToolbar: {
//   // Styles for toolbars
// },

// MuiTypography: {
//   // Styles for typography elements
// },
// MuiPaper: {
//   // Styles for paper components
// },
// MuiList: {
//   // Styles for lists
// },
// MuiMenu: {
//   // Styles for menus
// },
// MuiSnackbar: {
//   // Styles for snackbars
// },
// MuiTooltip: {
//   // Styles for tooltips
// },
// MuiCheckbox: {
//   // Styles for checkboxes
// },
// MuiRadio: {
//   // Styles for radio buttons
// },
// MuiSwitch: {
//   // Styles for switches
// },
// MuiAvatar: {
//   // Styles for avatar components
// },
// MuiBadge: {
//   // Styles for badge components
// },
// MuiStepper: {
//   // Styles for stepper components
// },
// MuiCircularProgress: {
//   // Styles for circular progress indicators
// },
// MuiLinearProgress: {
//   // Styles for linear progress indicators
// },
// MuiGrid: {
//   // Styles for grid components
// },
