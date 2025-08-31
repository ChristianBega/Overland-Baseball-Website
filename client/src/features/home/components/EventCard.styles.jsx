import { styled } from "@mui/material/styles";
import { Card, Box, Stack, Button, Typography } from "@mui/material";

export const StyledEventCard = styled(Card)(({ theme }) => ({
  borderRadius: "20px",
  padding: "0",
  gap: "1rem",
  boxShadow: "none",
  display: "flex",
  flexDirection: "column",
  cursor: "pointer",
  "&:hover": {
    transform: "scale(1.01)",
    transition: "all .3s ease-in-out",
  },
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
    cursor: "default",
    "&:hover": {
      transform: "none",
      transition: "none",
    },
  },
}));

export const StyledEventCardImageContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  minHeight: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  [theme.breakpoints.up("md")]: {
    maxWidth: "275px",
    minWidth: "275px",
  },
  [theme.breakpoints.up("lg")]: {
    maxWidth: "380px",
    minWidth: "380px",
  },
  [theme.breakpoints.down("md")]: {
    maxWidth: "100%",
    minWidth: "100%",
  },
}));

export const StyledEventCardImage = styled(Box)(({ theme }) => ({
  objectFit: "cover",
  borderRadius: "20px",
  border: "1px solid #d7d8e0",
  width: "100%",
  [theme.breakpoints.down("md")]: {
    maxHeight: "375px",
  },
  [theme.breakpoints.up("md")]: {
    minHeight: "243px",
  },
}));

export const StyledEventCardBodyText = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(2),
  justifyContent: "center",
}));

export const StyledEventCardHeader = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  [theme.breakpoints.up("md")]: {
    marginRight: "1rem",
  },
  [theme.breakpoints.down("md")]: {
    marginRight: "0",
  },
}));

export const StyledCircleButton = styled(Button)(() => ({
  fontSize: "18px",
}));

export const StyledIconButton = styled(Button)(() => ({
  "& .MuiSvgIcon-root": {
    height: "16px",
    width: "16px",
  },
}));
