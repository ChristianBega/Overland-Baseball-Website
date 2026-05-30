import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";

export const ProgressBarContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: "50%",
  top: 0,
  bottom: 0,
  width: "8px",
  transform: "translateX(-50%)",
  zIndex: 0,
  [theme.breakpoints.up("md")]: {
    width: "12px",
  },
}));

export const ProgressBarTrack = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  bottom: 0,
  width: "100%",
  backgroundColor: theme.palette.grey[300],
  borderRadius: "6px",
  boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)",
}));

export const ProgressBarFill = styled(motion.div)(({ theme, progress }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  borderRadius: "6px",
  transformOrigin: "top",
  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  background: theme.palette.gradients.primaryToTop,

  ...(progress <= 0.99 && {
    height: "90%",
  }),
  ...(progress === 1 && {
    height: "100%",
  }),
}));

export const ProgressIndicator = styled(motion.div)(({ theme }) => ({
  padding: "12px",
  position: "absolute",
  width: "20px",
  height: "20px",
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.main,
  border: `3px solid ${theme.palette.background.paper}`,
  boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 2,
  [theme.breakpoints.up("md")]: {
    width: "24px",
    height: "24px",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "50%",
    height: "50%",
    borderRadius: "50%",
    backgroundColor: theme.palette.primary.light,
    transform: "translate(-50%, -50%)",
  },
}));
