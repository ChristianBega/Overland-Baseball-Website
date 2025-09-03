import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";

export const TimelineContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  maxWidth: "1200px",
  margin: "0 auto",
}));

export const TimelineItemContainer = styled(motion.div)(({ theme, isLeft }) => ({
  position: "relative",
  marginBottom: theme.spacing(6),
  width: "100%",
  [theme.breakpoints.up("md")]: {
    width: "calc(50% - 20px)",
    marginLeft: isLeft ? "0" : "calc(50% + 20px)",
  },
}));

export const TimelineContent = styled(motion.div)(({ theme }) => ({
  marginTop: theme.spacing(1),
  [theme.breakpoints.up("md")]: {
    marginLeft: theme.spacing(8),
    marginLeft: 0,
  },
}));

export const YearHeader = styled(motion.div)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(4),
  position: "relative",
  zIndex: 2,
  "& .year-badge": {
    display: "inline-block",
    background: theme.palette.gradients.primary,
    border: `3px solid ${theme.palette.background.paper}`,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(1, 3),
    borderRadius: "25px",
    fontSize: "24px",
    fontWeight: "700",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },
}));
