import { Drawer, styled, Toolbar } from "@mui/material";

export const StyledDrawerMenu = styled(Drawer)(({ theme }) => ({
  background: "rgba(0, 0, 0, 0.7)",
  width: "100%",
  [theme.breakpoints.up("md")]: {
    width: "30%",
  },
}));

export const  StyledToolbar = styled(Toolbar)(({ theme, currentTheme }) => ({
  display: "flex",
  justifyContent: "space-between",
  color: theme.palette.text.primary,
  background: currentTheme === "dark" ? theme.palette.secondary.main : theme.palette.primary.main,

  padding: theme.spacing(2, 2),
  [theme.breakpoints.up("lg")]: {
    padding: theme.spacing(2, 4),
  },
}));