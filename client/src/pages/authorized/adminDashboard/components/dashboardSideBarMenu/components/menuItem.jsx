import { motion } from "framer-motion";
import { IconBox, MenuItem } from "../index.styles";
import { itemVariants } from "../../../../../../setup/framerAnimations/dashboardMenu";
import { Typography } from "@mui/material";

const MenuItemComponent = ({ item, index, handleSelectMenuItem, handleMouseEnter, handleMouseLeave, hoveredIndex }) => (
  <MenuItem
    component={motion.div}
    key={index}
    onClick={() => handleSelectMenuItem(item)}
    onMouseEnter={() => handleMouseEnter(index)}
    onMouseLeave={handleMouseLeave}
    initial="initial"
    animate={hoveredIndex === null ? "initial" : hoveredIndex === index ? "hover" : "faded"}
    whileTap="tap"
    variants={itemVariants}
  >
    <IconBox sx={{ mr: "1rem" }}>{item.icon}</IconBox>
    <Typography>{item.linkName.charAt(0).toUpperCase() + item.linkName.slice(1)}</Typography>
  </MenuItem>
);

export default MenuItemComponent;
