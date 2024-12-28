import { List, ListItem, styled } from "@mui/material";

export const StyledList = styled(List)(({ theme, navListType }) => ({
  color: theme.palette.primary.main,
  display: "flex",
  flexDirection: "column",
  minWidth: "60vw",
  [theme.breakpoints.up("sm")]: {
    minWidth: "50vw",
  },
  [theme.breakpoints.up("lg")]: {
    flexDirection: navListType === "account-menu" ? "column" : "row",
    width: "40%",
    maxWidth: "600px",
    justifyContent: "space-evenly",
  },
}));

export const StyledListItem = styled(ListItem)(({ theme, navListType }) => ({
  "&:hover": {
    backgroundColor: "#f1f1f18e",
    transition: "all .3s ease-in-out",
    [theme.breakpoints.up("lg")]: {
      backgroundColor: "transparent",
    },
    "& a": {
      transform: "scale(1.05)",
      transition: "all .3s ease-in-out",
    },
  },
  padding: "1rem",
  [theme.breakpoints.up("lg")]: {
    display: navListType === "navigation-menu" ? "flex" : "",
    justifyContent: navListType === "navigation-menu" ? "space-evenly" : "",
    borderTop: navListType === "navigation-menu" ? "none" : `1px solid ${theme.palette.borders.primary}`,
  },
  borderTop: `1px solid ${theme.palette.borders.primary}`,
  "&:last-child": {
    borderBottom: navListType === "navigation-menu" ? "none" : `1px solid ${theme.palette.borders.primary}`,
  },
}));
