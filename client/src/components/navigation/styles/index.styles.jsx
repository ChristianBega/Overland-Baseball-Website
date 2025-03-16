import { Drawer, styled, Toolbar } from "@mui/material";

export const StyledDrawerMenu = styled(Drawer)(({ theme }) => ({
  background: "rgba(0, 0, 0, 0.7)",
  width: "100%",
  maxWidth: "200px",
  // [theme.breakpoints.up("md")]: {
  //   border: "1px solid red",
  //   width: "200px",
  //   // width: "20%",
  // },
  "& .MuiDrawer-paper": {
    width: "350px",
  },
}));

export const StyledToolbar = styled(Toolbar)(({ theme, currentTheme }) => ({
  display: "flex",
  justifyContent: "space-between",
  color: theme.palette.text.primary,
  // background: currentTheme === "dark" ? theme.palette.secondary.main : theme.palette.primary.main,
  // background: "#ffffff16",

  // padding: theme.spacing(2, 2),
  // [theme.breakpoints.up("lg")]: {
  // padding: theme.spacing(2, 4),
  // },
}));
