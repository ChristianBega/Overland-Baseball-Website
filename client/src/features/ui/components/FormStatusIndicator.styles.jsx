import { Box, styled } from "@mui/material";

export const StyledFormStatusIndicatorContainer = styled(Box)(({ theme, isAuthFormError }) => ({
  border: `1px solid ${theme.palette.borders.primary}`,
  minHeight: "65px",
  marginBottom: "2rem",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  // TODO: Update styling to be dynamic based on the error type
  // ...(isAuthFormError && {
  //   border: `1px solid ${theme.palette.caution.main}`,
  //   color: theme.palette.caution.main,
  // }),
}));
