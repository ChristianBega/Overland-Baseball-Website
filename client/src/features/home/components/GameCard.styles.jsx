import { Card, Typography, Stack, Box, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledGameCard = styled(Card)(({ theme, isPast }) => ({
  padding: "20px 16px",
  border: "1px solid #e0e0e0",
  minWidth: { xs: "300px", md: "400px" },
  height: { xs: "220px", md: "250px" },
  borderRadius: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
  opacity: isPast ? 0.7 : 1,

  "&:hover": {
    transform: isPast ? "none" : "translateY(-2px)",
    boxShadow: isPast ? "none" : "0 4px 16px rgba(0, 0, 0, 0.1)",
    cursor: isPast ? "not-allowed" : "pointer",
  },

  [theme.breakpoints.down("md")]: {
    minWidth: "300px",
    height: "220px",
  },
  [theme.breakpoints.up("md")]: {
    minWidth: "400px",
    height: "250px",
  },
}));

export const StyledCardHeader = styled(Box)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(1),
}));

export const StyledGameTitle = styled(Typography)(({ theme }) => ({
  fontSize: "0.7rem",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.8px",
  marginBottom: theme.spacing(1),
  opacity: 0.8,
  textWrap: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
}));

export const StyledDateDisplay = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.primary,
  lineHeight: 1.2,
  marginBottom: theme.spacing(0.5),

  [theme.breakpoints.down("md")]: {
    fontSize: "1.1rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.25rem",
  },
}));

export const StyledTeamStack = styled(Stack)(({ theme }) => ({
  justifyContent: "center",
  alignItems: "center",
  width: "30%",
}));

export const StyledTeamName = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  textAlign: "center",

  [theme.breakpoints.down("md")]: {
    fontSize: "0.8rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "0.875rem",
  },
}));

export const StyledTimeStatusStack = styled(Stack)(({ theme }) => ({
  alignItems: "center",
  width: "40%",
}));

export const StyledTimeDisplay = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontWeight: "bold",
  color: theme.palette.primary.main,
  lineHeight: 1,
}));

export const StyledOpponentName = styled(Typography)(({ theme }) => ({
  maxWidth: "80px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  textAlign: "center",
  fontWeight: 500,

  [theme.breakpoints.down("md")]: {
    fontSize: "0.8rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "0.875rem",
  },
}));

export const StyledHiddenText = styled(Typography)(({ theme }) => ({
  position: "absolute",
  left: "-10000px",
}));

export const StatusChip = styled(Chip)(({ theme, isHome }) => ({
  fontSize: "12px",
  backgroundColor: isHome ? theme.palette.secondary.main : `#09255d`,
  height: "20px",
  "& .MuiChip-label": {
    color: "#fff",
  },
  [theme.breakpoints.up("sm")]: {
    height: "30px",
  },
}));

export const TeamLogoAvatar = styled(Box)(({ theme, sx }) => ({
  width: 45,
  height: 45,
  borderRadius: "50%",
  backgroundColor: theme.palette.grey[300],
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.grey[600],
  fontWeight: "bold",
  [theme.breakpoints.up("laptop")]: {
    width: 50,
    height: 50,
    ...sx,
  },
}));
