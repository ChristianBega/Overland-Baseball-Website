import { Box, Button, Grid, List, ListItem, Typography } from "@mui/material";
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
const containerVariants = {
  open: {
    height: "100%",
    maxHeight: "400px",
    y: 0,
    opacity: 1,
    transition: { easeInOut: [0.43, 0.13, 0.23, 0.96], duration: 0.6, stiffness: 90, mass: 0.5, damping: 10, type: "spring" },
  },
  closed: {
    opacity: 0,
    height: 0,
    transition: { easeInOut: [0.43, 0.13, 0.23, 0.96], duration: 0.6, stiffness: 90, mass: 0.5, damping: 10, type: "spring" },
  },
};

const itemVariants = {
  initial: { opacity: 1, backgroundColor: "transparent" },
  hover: {
    opacity: 1,
    backgroundColor: "#007f3b",
    transition: { easeInOut: [0.43, 0.13, 0.23, 0.96], duration: 0.6, stiffness: 90, mass: 0.5, damping: 10, type: "spring" },
  },
  tap: {
    opacity: 1,
    backgroundColor: "#21c067",
    transition: { easeInOut: [0.43, 0.13, 0.23, 0.96], duration: 0.6, stiffness: 90, mass: 0.5, damping: 10, type: "spring" },
  },
  faded: { opacity: 0.5, transition: { duration: 0.3 } },
};

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
      <Box id="menu-wrapper" sx={{ position: "relative" }} onBlur={handleBlur} tabIndex={-1} ref={menuRef}>
        <Box>
          <Button
            id="slider-btn"
            onClick={toggleMenu}
            sx={{
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
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {currentItem?.icon}
              <Typography component="span" sx={{ ml: "1rem", display: "flex", alignItems: "center" }}>
                {currentItem ? <>{currentItem.linkName}</> : "Please Select An Option To Edit"}
              </Typography>
            </Box>
            <ArrowDropDownIcon sx={{ transform: isOpen ? "rotate(180deg)" : "none" }} />
          </Button>
        </Box>
        <Box
          id="slider-menu"
          component={motion.section}
          initial={false}
          animate={isOpen ? "open" : "closed"}
          variants={containerVariants}
          sx={{
            width: "100%",
            height: "100%",
            textAlign: "center",
            overflowY: "scroll",
          }}
        >
          <List
            sx={{
              padding: 0,
              marginTop: isOpen && "48px",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              backgroundColor: theme.palette.primary.main,
            }}
          >
            {menuListItems.map((item, index) => (
              <ListItem
                component={motion.div}
                key={index}
                onClick={() => handleSelectMenuItem(item)}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                initial="initial"
                animate={hoveredIndex === null ? "initial" : hoveredIndex === index ? "hover" : "faded"}
                whileTap="tap"
                variants={itemVariants}
                sx={{
                  color: "#fff",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  padding: "1rem",
                  cursor: "pointer",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mr: "1rem" }}>{item.icon}</Box>
                {item.linkName}
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Grid>
  );
};

export default DashboardSideBarMenu;
