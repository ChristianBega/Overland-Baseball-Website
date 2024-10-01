import { Box, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React, { useState, useRef, useContext, useEffect } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useTheme } from "@emotion/react";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import EventIcon from "@mui/icons-material/Event";
import TopicIcon from "@mui/icons-material/Topic";
import LinkIcon from "@mui/icons-material/Link";
import DateRangeIcon from "@mui/icons-material/DateRange";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { containerVariants, itemVariants } from "../../../../../setup/framerAnimations/dashboardMenu";
import { IconBox, MenuWrapper, SliderButton, SliderMenu, MenuList, MenuItem } from "./index.styles";
import { CmsContext } from "../../../../../setup/context/cms.context";

const menuListItems = [
  { linkName: "dashboard", urlPath: "/", icon: <DashboardIcon sx={{ fontSize: "20px" }} /> },
  { linkName: "schedule", urlPath: "/", icon: <DateRangeIcon sx={{ fontSize: "20px" }} /> },
  { linkName: "roster", urlPath: "/", icon: <FormatListNumberedIcon sx={{ fontSize: "20px" }} /> },
  { linkName: "events", urlPath: "/", icon: <EventIcon sx={{ fontSize: "20px" }} /> },
  { linkName: "documents", urlPath: "/", icon: <TopicIcon sx={{ fontSize: "20px" }} /> },
  { linkName: "sponsors", urlPath: "/", icon: <VolunteerActivismIcon sx={{ fontSize: "20px" }} /> },
  { linkName: "quick links", urlPath: "/", icon: <LinkIcon sx={{ fontSize: "20px" }} /> },
];

const DashboardSideBarMenu = () => {
  const theme = useTheme();
  const menuRef = useRef();

  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { currentItem, setCurrentItem } = useContext(CmsContext);

  useEffect(() => {
    setCurrentItem(menuListItems[0]);
  }, []);

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
    <Grid item xs={12} lg={12}>
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
