import { Box, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledSliderContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  overflow: "visible",
  zIndex: 1,
  // Add padding to accommodate buttons ONLY on large screens
  [theme.breakpoints.up("lg")]: {
    paddingLeft: "60px",
    paddingRight: "60px",
  },
  [theme.breakpoints.down("lg")]: {
    paddingLeft: "1rem",
    paddingRight: "1rem",
  },
}));

export const StyledSliderWrapper = styled(Box)(({ theme }) => ({
  padding: "1rem",
  display: "flex",
  gap: "16px",
  overflowX: "auto",
  scrollBehavior: "smooth",
  paddingBottom: "8px",
  borderRadius: "8px",
  cursor: "grab",
  userSelect: "none",

  // Always hide scrollbars but keep scrolling functionality
  "&::-webkit-scrollbar": {
    display: "none",
  },
  scrollbarWidth: "none",
  msOverflowStyle: "none",

  "&:active": {
    cursor: "grabbing",
  },

  // Ensure smooth scrolling on all browsers
  WebkitOverflowScrolling: "touch",
}));

export const StyledNavigationButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(8px)",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  width: "48px",
  height: "48px",
  zIndex: 10,
  transition: "all 0.3s ease-in-out",
  border: `1px solid ${theme.palette.grey[200]}`,

  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 1)",
    transform: "translateY(-50%) scale(1.1)",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.25)",
    borderColor: theme.palette.primary.light,
  },
  "&:disabled": {
    opacity: 0.4,
    cursor: "not-allowed",
    "&:hover": {
      transform: "translateY(-50%)",
      backgroundColor: "rgba(255, 255, 255, 0.95)",
    },
  },
  "& .MuiSvgIcon-root": {
    fontSize: "24px",
    color: theme.palette.primary.main,
  },
}));

export const StyledLeftButton = styled(StyledNavigationButton)(({ theme }) => ({
  left: "8px",
  // HIDE on screens smaller than large (1200px)
  [theme.breakpoints.down("lg")]: {
    display: "none",
  },
}));

export const StyledRightButton = styled(StyledNavigationButton)(({ theme }) => ({
  right: "8px",
  // HIDE on screens smaller than large (1200px)
  [theme.breakpoints.down("lg")]: {
    display: "none",
  },
}));

// Scroll hint for smaller screens
export const StyledScrollHint = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  marginTop: "12px",
  padding: "8px 16px",
  fontSize: "14px",
  fontWeight: 500,
  // SHOW only on screens smaller than large
  [theme.breakpoints.up("lg")]: {
    display: "none",
  },
  "& .arrow": {
    fontSize: "16px",
    animation: "pulse 2s infinite",
  },
}));

