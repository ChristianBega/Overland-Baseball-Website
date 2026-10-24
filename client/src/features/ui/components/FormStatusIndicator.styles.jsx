import { Box, styled } from "@mui/material";

export const StyledFormStatusIndicatorContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isErrorOnly",
})(({ theme, isErrorOnly }) => ({
  border: `1px solid ${theme.palette.borders.primary}`,
  minHeight: "65px",
  marginBottom: "2rem",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  // Errors render through ErrorMessage (MUI Alert), which brings its own tinted surface,
  // so the error state drops the grey bordered box.
  ...(isErrorOnly && {
    border: "none",
    minHeight: "auto",
  }),
  // TODO: Update styling to be dynamic based on the error type
  // ...(isAuthFormError && {
  //   border: `1px solid ${theme.palette.caution.main}`,
  //   color: theme.palette.caution.main,
  // }),
}));
