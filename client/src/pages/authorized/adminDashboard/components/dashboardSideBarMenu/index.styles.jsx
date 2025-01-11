import { Box, Button, List, ListItem, styled } from "@mui/material";
import { motion } from "framer-motion";

export const MenuWrapper = styled(Box)({
  position: "relative",
  width: "100%",
});

export const StyledMenuDropDownButton = styled(Button)(({ theme, isOpen }) => ({
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
  padding: "1rem !important",
  color: theme.palette.text.secondary2,
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export const IconBox = styled(Box)({
  display: "flex",
  alignItems: "center",
});

export const StyledSliderMenu = styled(motion.div)({
  // width: "100%",
  // height: "100%",
  // // textAlign: "center",
  overflowY: "scroll",
});

export const StyledMenuList = styled(List)(({ theme, isOpen }) => ({
  padding: 0,
  marginTop: isOpen ? "56px" : 0,
  display: "flex",
  flexDirection: "column",
  height: "100%",
  backgroundColor: theme.palette.primary.main,
}));

export const StyledMenuItem = styled(ListItem)({
  color: "#fff",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  padding: "1rem",
  cursor: "pointer",
});
