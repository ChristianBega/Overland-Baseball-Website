import { Box, Button, List, ListItem, styled } from "@mui/material";
import { motion } from "framer-motion";

export const MenuWrapper = styled(Box)({
  position: "relative",
  width: "100%",
});

export const SliderButton = styled(Button)(({ theme, isOpen }) => ({
  width: "100%",
  position: isOpen ? "absolute" : "relative",
  top: 0,
  right: 0,
  zIndex: 1,
  borderRadius: 0,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: theme.palette.secondary.main,
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export const IconBox = styled(Box)({
  display: "flex",
  alignItems: "center",
});

export const SliderMenu = styled(motion.section)({
  width: "100%",
  height: "100%",
  textAlign: "center",
  overflowY: "scroll",
});

export const MenuList = styled(List)(({ theme, isOpen }) => ({
  padding: 0,
  marginTop: isOpen ? "48px" : 0,
  display: "flex",
  flexDirection: "column",
  height: "100%",
  backgroundColor: theme.palette.primary.main,
}));

export const MenuItem = styled(ListItem)({
  color: "#fff",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  padding: "1rem",
  cursor: "pointer",
});
