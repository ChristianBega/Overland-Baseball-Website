import { IconButton, styled } from "@mui/material";

export const StyledAccountIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary2,
  padding: ".5rem",
  border: "1px solid #9194952b",
  backgroundColor: "#f9fafa1c",
}));

export const StyledAccountCloseButton = styled(IconButton)(({ theme }) => ({
  marginLeft: "auto",
}));
