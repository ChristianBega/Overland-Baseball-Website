import { List, ListItem, styled } from "@mui/material";

export const StyledList = styled(List)(({ theme, navListType }) => ({
  color: theme.palette.primary.main,
  display: "flex",
  flexDirection: "column",
  marginBlock: "2rem",
  paddingInline: "1rem",
  // [theme.breakpoints.up("sm")]: {
  //   minWidth: "50vw",
  // },
  [theme.breakpoints.up("lg")]: {
    flexDirection: navListType === "account-menu" ? "column" : "row",
    // width: "40%",
    minWidth: "50vw",
    maxWidth: "600px",
    marginBlock: "0",

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

  [theme.breakpoints.up("lg")]: {
    display: navListType === "navigation-menu" ? "flex" : "",
    justifyContent: navListType === "navigation-menu" ? "space-evenly" : "",
    marginBottom: "0",

    ...(currentUrl === url && {
      background: "transparent",
    }),
  },
  ...(currentUrl === url && {
    background: "linear-gradient(180deg, #5f5f5f1b 20%, #b3b3b311 40%)",
  }),
  ...(currentUrl !== url && {
    color: "#f1f1f18e !important",
    "& .active-link": {
      color: "#f1f1f18e !important",
    },
    "& .inactive-link": {
      color: "#9b9b9bb7 !important",
      [theme.breakpoints.up("lg")]: {
        color: `${theme.palette.secondary.main} !important`,
      },
    },
  }),
}));
