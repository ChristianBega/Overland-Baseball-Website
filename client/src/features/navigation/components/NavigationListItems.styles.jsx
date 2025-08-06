import { Link, List, ListItem, styled, Typography } from "@mui/material";

export const StyledList = styled(List)(({ theme, navListType }) => ({
  display: "flex",
  flexDirection: "column",
  marginBlock: "2rem",
  paddingInline: "1rem",

  [theme.breakpoints.up("lg")]: {
    flexDirection: navListType === "account-menu" ? "column" : "row",
    marginBlock: navListType === "account-menu" ? "2rem" : "0",

    justifyContent: "space-evenly",
  },
}));

export const StyledListItem = styled(ListItem)(({ theme, navListType, currentUrl, url }) => ({
  padding: ".5rem 1rem",
  borderRadius: "50px",
  marginBottom: "1rem",
  "&:hover": {
    transition: "all .3s ease-in-out",
    [theme.breakpoints.up("lg")]: {
      backgroundColor: "transparent",
    },
    "& a": {
      transform: "scale(1.05)",
      transition: "all .3s ease-in-out",
    },
  },

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
  ...(currentUrl === url && {
    background: "linear-gradient(180deg, #5f5f5f1b 20%, #b3b3b311 40%)",
  }),
  ...(currentUrl !== url && {
    color: "#f1f1f18e !important",
    "& .inactive-link": {
      color: "#9b9b9bb7 !important",
      [theme.breakpoints.up("lg")]: {
        color: "#d4d4d4 !important",
      },
      textDecoration: "none !important",
      "&:hover": {
        transition: "all .3s ease-in-out",
        color: "#00ff2fce !important",
      },
    },
  }),
}));

export const StyledNavigationLink = styled(Link)(({ theme, currentUrl, url }) => ({
  ...(currentUrl === url && {
    textDecoration: "underline !important",
  }),
}));

export const StyledNavigationTypography = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
}));
