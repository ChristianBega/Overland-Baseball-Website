import { styled } from "@mui/material/styles";
import { Box, Link, Stack, Card, Chip } from "@mui/material";

export const StyledScheduleItemContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  backgroundColor: theme.palette.secondary.main,
  display: "flex",
  alignItems: "center",
  padding: ".5rem",
  borderRadius: "4px",
  "&:hover": {
    transition: "all .3s ease-in-out",
    backgroundColor: `${theme.palette.primary.main}`,
    cursor: "pointer",
  },
}));

export const StyledLogoStack = styled(Stack)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    minWidth: "325px",
  },

  [theme.breakpoints.up("laptop")]: {
    minWidth: "450px",
  },
}));

export const StyledDateStack = styled(Stack)(({ theme }) => ({
  direction: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "65px",
  minWidth: "115px",
  borderRight: "1px solid hsl(0, 0%, 90%)",
  padding: "0.5rem",
  color: "#fff",
  [theme.breakpoints.up("sm")]: {
    minWidth: "125px",
  },
  [theme.breakpoints.up("md")]: {
    minWidth: "165px",
  },
}));

export const StyledLocationLink = styled(Link)(({ theme }) => ({
  color: "#fff",
  fontSize: "12px",
  display: "flex",
  alignItems: "center",
  gap: ".25rem",
  marginBottom: 0,
  width: "100%",
  justifyContent: "center",
  [theme.breakpoints.up("sm")]: {
    fontSize: "16px",
  },
}));

// New styled components for refactored component
export const DateDisplayContainer = styled(Stack)(({ theme }) => ({
  minHeight: "85px",
  minWidth: "85px",
  backgroundColor: theme.palette.secondary.main,

  color: "#fff",
  padding: ".5rem",
  borderRadius: "4px",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.up("sm")]: {
    minHeight: "90px",
    minWidth: "90px",
  },
  [theme.breakpoints.up("md")]: {
    minHeight: "95px",
    minWidth: "95px",
  },
  [theme.breakpoints.up("lg")]: {
    minHeight: "110px",
    minWidth: "110px",
  },
}));

export const LocationLinkWrapper = styled(Link)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: ".25rem",
  fontSize: "14px",
  textDecoration: "underline",
  justifyContent: "flex-start",
  whiteSpace: "nowrap",
  [theme.breakpoints.up("md")]: {
    maxWidth: "200px",
    alignSelf: "flex-end",
  },
}));

export const TeamLogoContainer = styled(Stack)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing(2),
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

export const ScheduleCard = styled(Card)(({ theme, isMobile, isDesktop, isPast }) => ({
  justifyContent: "flex-start",
  gap: "1rem",
  padding: ".75rem",
  ...(isDesktop && {
    alignItems: "center",
  }),
  ...(isPast && {
    opacity: 0.8,
    filter: "grayscale(30%)",
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      cursor: "not-allowed",
    },
  }),
}));

export const TeamLogoAvatar = styled(Box)(({ theme }) => ({
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
  },
}));
