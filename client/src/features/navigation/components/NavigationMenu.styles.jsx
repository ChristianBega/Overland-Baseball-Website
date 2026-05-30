import { Box, IconButton, styled } from "@mui/material";

export const StyledMenuIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary2,
  padding: ".5rem",
  border: "1px solid #9194952b",
  backgroundColor: "#f9fafa1c",
}));

export const StyledCloseIconButton = styled(IconButton)(({ theme }) => ({
  marginLeft: "auto",
}));

export const StyledMenuContentBox = styled(Box)(({ theme }) => ({
  marginBlock: "2rem",
  textAlign: "center",
  padding: "1rem",
}));
