// Framer Motion
import { motion } from "framer-motion";
import { itemVariants } from "../../../../../../setup/framerAnimations/dashboardMenu";
// Styles
import { IconBox, StyledMenuItem } from "../index.styles";
// MUI
import { Typography } from "@mui/material";

const MenuItemComponent = ({ item, index, handleSelectMenuItem, handleMouseEnter, handleMouseLeave, hoveredIndex, isDisabled }) => (
  <StyledMenuItem
    component={motion.li}
    key={index}
    onClick={() => !isDisabled && handleSelectMenuItem(item)}
    onMouseEnter={() => handleMouseEnter(index)}
    onMouseLeave={handleMouseLeave}
    initial="initial"
    animate={hoveredIndex === null ? "initial" : hoveredIndex === index ? "hover" : "faded"}
    whileTap="tap"
    variants={itemVariants}
    isDisabled={isDisabled}
  >
    <IconBox sx={{ mr: "1rem" }}>{item.icon}</IconBox>
    <Typography>{item.linkName.charAt(0).toUpperCase() + item.linkName.slice(1)}</Typography>
  </StyledMenuItem>
);

export default MenuItemComponent;
