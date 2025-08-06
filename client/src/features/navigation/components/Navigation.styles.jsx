import { AppBar, styled, Toolbar } from "@mui/material";

export const StyledToolbar = styled(Toolbar)(({ theme, currentTheme }) => ({
  display: "flex",
  justifyContent: "space-between",
  color: theme.palette.text.primary,
}));

export const StyledAppBar = styled(AppBar)(({ theme, isTransparent }) => ({
  background: "radial-gradient(circle, #082463 0%, rgba(9,31,64,1) 100%)",
  backdropFilter: "blur(10px)",
  padding: "1rem",
  boxShadow: "0 0 10px 5px rgba(0, 0, 0, .4)",
  [theme.breakpoints.up("lg")]: {
    padding: "1.5rem",
  },
  ...(isTransparent && {
    background: "transparent",
    backdropFilter: "none",
    boxShadow: "none",
  }),
}));
