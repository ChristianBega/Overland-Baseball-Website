import { Link, List, ListItem, styled, Typography } from "@mui/material";

export const StyledList = styled(List)(({ theme, navListType }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBlock: navListType === "navigation-menu-footer" ? "0" : "2rem",
  paddingInline: navListType === "navigation-menu-footer" ? "0" : "1rem",

  [theme.breakpoints.up("lg")]: {
    flexDirection: navListType === "account-menu" || navListType === "navigation-menu-footer" ? "column" : "row",
    marginBlock: navListType === "account-menu" ? "2rem" : "0",

    justifyContent: "space-evenly",
  },
}));

export const StyledListItem = styled(ListItem)(({ theme, navListType, currentUrl, url }) => ({
  padding: ".5rem 1rem",
  borderRadius: "50px",
  marginBottom: "1rem",
  ...(navListType === "navigation-menu-footer" && {
    paddingInline: "0",
    marginBottom: "0",
  }),
  "&:hover": {
    transition: "all .3s ease-in-out",
    [theme.breakpoints.up("lg")]: {
      backgroundColor: "transparent",
    },
    "& a": {
      transition: "all .3s ease-in-out",
    },
  },

  // if account menu - aka the menu that opens when the user clicks the account icon
  ...(navListType !== "account-menu" && {
    [theme.breakpoints.up("lg")]: {
      display: navListType === "navigation-menu" ? "flex" : "",
      justifyContent: navListType === "navigation-menu" ? "space-evenly" : "",
      marginBottom: "0",
      marginInline: "2rem",
      ...(currentUrl === url && {
        background: "transparent",
      }),
    },
  }),

  // if current url is the same as the url - aka active link
  ...(currentUrl === url && {
    background: "linear-gradient(180deg, #5f5f5f1b 20%, #b3b3b311 40%)",
  }),
  // if current url is not the same as the url - aka inactive link
  ...(currentUrl !== url && {
    color: "#f1f1f18e !important",
    "& .inactive-link": {
      color: "#9b9b9bb7 !important",

      [theme.breakpoints.up("lg")]: {
        color: "#ffffff !important",
      },
      textDecoration: "none !important",
      "&:hover": {
        transition: "all .3s ease-in-out",
        color: theme.palette.secondary.hover + " !important",
      },
    },
    // if navigation menu footer - aka the footer menu links
    ...(navListType === "navigation-menu-footer" && {
      "& .inactive-link": {
        color: "#ffffff !important",
        "&:hover": {
          transition: "all .3s ease-in-out",
          color: theme.palette.secondary.hover + " !important",
        },
      },
    }),
  }),
}));

export const StyledNavigationLink = styled(Link)(({ theme, currentUrl, url, navListType }) => ({
  ...(currentUrl === url && {
    textDecoration: "underline !important",
  }),
}));

export const StyledNavigationTypography = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
}));
