import { styled } from "@mui/material/styles";
import { Box, Link, Stack, Typography } from "@mui/material";

export const StyledDateBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: ".5rem",
  height: "82px",
  minWidth: "90px",
  borderRadius: "4px",
  boxShadow: "0px 0px 5px 0px #626262ab",
  backgroundColor: theme.palette.secondary.main,
}));

export const StyledLogoStack = styled(Stack)({
  width: "100%",
  paddingInline: "1rem",
});

export const StyledInfoLink = styled(Link)({
  display: "flex",
  alignItems: "center",
  marginBottom: 0,
  width: "50%",
  justifyContent: "center",
});

export const StyledInfoTypography = styled(Typography)({
  display: "flex",
  alignItems: "center",
  gap: ".25rem",
});
