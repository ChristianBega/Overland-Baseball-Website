import React, { useRef, useContext } from "react";
import { useTheme } from "@emotion/react";
// Material UI components and icons
import { Grid, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import EventIcon from "@mui/icons-material/Event";
import TopicIcon from "@mui/icons-material/Topic";
import DateRangeIcon from "@mui/icons-material/DateRange";
import DashboardIcon from "@mui/icons-material/Dashboard";
// Custom components and styles
import { IconBox, MenuWrapper, SliderButton, SliderMenu, MenuList } from "./index.styles";
import MenuItemComponent from "./components/menuItem";
// State Management
import { CmsContext } from "../../../../../setup/context/cmsContext/cms.context";
import { UserContext } from "../../../../../setup/context/user.context";
// Utilities & Hooks
import { useCheckAuthorization } from "../../../../../setup/utils/helpers/checkAuthorization";
import { containerVariants } from "../../../../../setup/framerAnimations/dashboardMenu";
import useMenuLogic from "./hooks/useMenuLogic";

const menuListItems = [
  { linkName: "dashboard", urlPath: "/", icon: <DashboardIcon sx={{ fontSize: "20px" }} /> },
  { linkName: "schedule", urlPath: "/", icon: <DateRangeIcon sx={{ fontSize: "20px" }} /> },
  { linkName: "roster", urlPath: "/", icon: <FormatListNumberedIcon sx={{ fontSize: "20px" }} /> },
  { linkName: "events", urlPath: "/", icon: <EventIcon sx={{ fontSize: "20px" }} /> },
  { linkName: "documents", urlPath: "/", icon: <TopicIcon sx={{ fontSize: "20px" }} /> },
  // { linkName: "sponsors", urlPath: "/", icon: <VolunteerActivismIcon sx={{ fontSize: "20px" }} /> },
  // { linkName: "quick links", urlPath: "/", icon: <LinkIcon sx={{ fontSize: "20px" }} /> },
];

const DashboardSideBarMenu = () => {
  const theme = useTheme();
  const menuRef = useRef();
  const { currentUserProfile } = useContext(UserContext);
  const { role } = currentUserProfile;
  const { currentItem, setCurrentItem } = useContext(CmsContext);
  const checkAuthorization = useCheckAuthorization();

  const { isOpen, hoveredIndex, toggleMenu, handleMouseEnter, handleMouseLeave, handleSelectMenuItem, setIsOpen } = useMenuLogic(
    menuListItems,
    setCurrentItem,
    checkAuthorization,
    role
  );

  const handleBlur = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.relatedTarget)) {
      setIsOpen(false);
    }
  };

  return (
    <Grid item xs={12} lg={12}>
      <MenuWrapper id="menu-wrapper" onBlur={handleBlur} tabIndex={-1} ref={menuRef}>
        <SliderButton id="slider-btn" onClick={toggleMenu} theme={theme} isOpen={isOpen}>
          <IconBox>
            {currentItem?.icon}
            <Typography component="span" sx={{ ml: "1rem", display: "flex", alignItems: "center" }}>
              {currentItem ? <>{currentItem.linkName.toUpperCase()}</> : "Please Select An Option To Edit"}
            </Typography>
          </IconBox>
          <ArrowDropDownIcon sx={{ transform: isOpen ? "rotate(180deg)" : "none" }} />
        </SliderButton>
        <SliderMenu id="slider-menu" initial={false} animate={isOpen ? "open" : "closed"} variants={containerVariants}>
          <MenuList theme={theme} isOpen={isOpen}>
            {menuListItems.map((item, index) => (
              <MenuItemComponent
                item={item}
                index={index}
                handleSelectMenuItem={handleSelectMenuItem}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                hoveredIndex={hoveredIndex}
              />
            ))}
          </MenuList>
        </SliderMenu>
      </MenuWrapper>
    </Grid>
  );
};

export default DashboardSideBarMenu;
