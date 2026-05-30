import { Box, Link, styled } from "@mui/material";

export const StyledLogoLink = styled(Link)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  columnGap: 4,
  cursor: "pointer",
  "&:hover": {
    cursor: "pointer",
    scale: "1.1",
    transition: ".3s all ease-in-out",
  },
}));

export const StyledLogoContainer = styled(Box)(({ theme }) => ({
  height: "55px",
  width: "auto",
}));

export const StyledLogoImage = styled(Box)(({ theme }) => ({
  height: "60px",
  width: "auto",
  [theme.breakpoints.up("md")]: {
    height: "55px",
  },
  [theme.breakpoints.up("lg")]: {
    height: "65px",
  },
}));
