import { Box, styled } from "@mui/material";

export const StyledFormStatusIndicatorContainer = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.borders.primary}`,
  minHeight: "65px",
  marginBottom: "2rem",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  // Errors render as an inline `Notice`, not in this box.
}));
