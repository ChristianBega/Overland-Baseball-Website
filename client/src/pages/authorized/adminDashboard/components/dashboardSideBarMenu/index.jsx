import { Box, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React, { useState, useRef } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useTheme } from "@emotion/react";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import EventIcon from "@mui/icons-material/Event";
import TopicIcon from "@mui/icons-material/Topic";
import LinkIcon from "@mui/icons-material/Link";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { containerVariants, itemVariants } from "../../../../../setup/framerAnimations/dashboardMenu";
import { IconBox, MenuWrapper, SliderButton, SliderMenu, MenuList, MenuItem } from "./index.styles";

const menuListItems = [
  { linkName: "Schedule", urlPath: "/", icon: <DateRangeIcon sx={{ fontSize: "20px" }} /> },
  { linkName: "Roster", urlPath: "/", icon: <FormatListNumberedIcon sx={{ fontSize: "20px" }} /> },
  { linkName: "Events", urlPath: "/", icon: <EventIcon sx={{ fontSize: "20px" }} /> },
  { linkName: "Documents", urlPath: "/", icon: <TopicIcon sx={{ fontSize: "20px" }} /> },
  { linkName: "Sponsors", urlPath: "/", icon: <VolunteerActivismIcon sx={{ fontSize: "20px" }} /> },
  { linkName: "Quick Links", urlPath: "/", icon: <LinkIcon sx={{ fontSize: "20px" }} /> },
];

const DashboardSideBarMenu = () => {
  const theme = useTheme();
  const menuRef = useRef();

  const [isOpen, setIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleSelectMenuItem = (item) => {
    setCurrentItem(item);
    setIsOpen(false);
  };

  const handleBlur = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.relatedTarget)) {
      setIsOpen(false);
    }
  };

  return (
    <Grid item xs={12} lg={8}>
      <MenuWrapper id="menu-wrapper" onBlur={handleBlur} tabIndex={-1} ref={menuRef}>
        <Box>
          <SliderButton id="slider-btn" onClick={toggleMenu} theme={theme} isOpen={isOpen}>
            <IconBox>
              {currentItem?.icon}
              <Typography component="span" sx={{ ml: "1rem", display: "flex", alignItems: "center" }}>
                {currentItem ? <>{currentItem.linkName}</> : "Please Select An Option To Edit"}
              </Typography>
            </IconBox>
            <ArrowDropDownIcon sx={{ transform: isOpen ? "rotate(180deg)" : "none" }} />
          </SliderButton>
        </Box>
        <SliderMenu id="slider-menu" initial={false} animate={isOpen ? "open" : "closed"} variants={containerVariants}>
          <MenuList theme={theme} isOpen={isOpen}>
            {menuListItems.map((item, index) => (
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
                {item.linkName}
              </MenuItem>
            ))}
          </MenuList>
        </SliderMenu>
      </MenuWrapper>
    </Grid>
  );
};

export default DashboardSideBarMenu;
