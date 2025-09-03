import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledAlumniCard = styled(Box)(({ theme }) => ({
  maxWidth: "350px",
  width: "100%",
  margin: "0 auto",
  padding: theme.spacing(2),
  borderRadius: "12px",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  backgroundColor: theme.palette.background.paper,
  display: "flex",
  flexDirection: "row",
  gap: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    maxWidth: "380px",
  },
  [theme.breakpoints.up("md")]: {
    maxWidth: "440px",
  },
}));

export const StyledPlayerName = styled(Typography)({
  fontSize: "18px",
  fontWeight: "600",
  textAlign: "center",
  textTransform: "capitalize",
});

export const StyledInfoText = styled(Typography)(({ theme, truncate = false }) => ({
  width: "50%",
  fontSize: "14px",
  color: "text.secondary",
  ...(truncate && {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    maxWidth: "130px",
  }),
}));

// New styled components for inline sx props
export const StyledPlayerImageContainer = styled(Box)(({ theme }) => ({
  width: "120px",
  height: "150px",
  [theme.breakpoints.up("md")]: {
    width: "130px",
    height: "170px",
  },
}));

export const StyledContentContainer = styled(Box)({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  justifyContent: "center",
});
