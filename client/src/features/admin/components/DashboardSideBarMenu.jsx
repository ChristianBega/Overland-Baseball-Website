// ! DEPRECATED - REMOVE SOON!!!!
// Todo: instead of using the currentItem, which tracks the current item being edited, use pages?
import React, { useRef, useContext } from "react";
import { useTheme } from "@emotion/react";
// Material UI components and icons
import { Grid, Stack, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import EventIcon from "@mui/icons-material/Event";
import TopicIcon from "@mui/icons-material/Topic";
import DateRangeIcon from "@mui/icons-material/DateRange";
import DashboardIcon from "@mui/icons-material/Dashboard";
// Custom components and styles
import { MenuWrapper, StyledMenuDropDownButton, StyledSliderMenu, StyledMenuList } from "./DashboardSideBarMenu.styles";
import MenuItemComponent from "./MenuItem";
// State Management
import { CmsContext } from "../../../features/cms/context/CmsContext";
import { UserContext } from "../../../features/auth/context/UserContext";
// Utilities & Hooks
import { useCheckAuthorization } from "../../../utils/helpers/checkAuthorization";
import { containerVariants } from "../../../utils/animations/dashboardMenu";
import useMenuLogic from "../hooks/useMenuLogic";

const menuListItems = [
  { linkName: "dashboard", urlPath: "/", icon: <DashboardIcon sx={{ fontSize: "20px" }} />, disabled: false },
  { linkName: "schedule", urlPath: "/", icon: <DateRangeIcon sx={{ fontSize: "20px" }} />, disabled: false },
  { linkName: "roster", urlPath: "/", icon: <FormatListNumberedIcon sx={{ fontSize: "20px" }} />, disabled: false },
  { linkName: "events", urlPath: "/", icon: <EventIcon sx={{ fontSize: "20px" }} />, disabled: false },
  { linkName: "documents", urlPath: "/", icon: <TopicIcon sx={{ fontSize: "20px" }} />, disabled: true },
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
    <Grid item xs={12} sx={{ marginTop: "2rem" }}>
      <MenuWrapper id="menu-wrapper" onBlur={handleBlur} tabIndex={-1} ref={menuRef}>
        <StyledMenuDropDownButton id="menu-dropdown-button" onClick={toggleMenu} isOpen={isOpen}>
          <Stack direction="row" alignItems="center">
            {currentItem?.icon}
            <Typography component="span" sx={{ ml: "1rem", display: "flex", alignItems: "center" }}>
              {currentItem ? <>{currentItem.linkName.toUpperCase()}</> : "Please Select An Option To Edit"}
            </Typography>
          </Stack>
          <ArrowDropDownIcon sx={{ transform: isOpen ? "rotate(180deg)" : "none" }} />
        </StyledMenuDropDownButton>
        <StyledSliderMenu id="slider-menu" initial={false} animate={isOpen ? "open" : "closed"} variants={containerVariants}>
          <StyledMenuList isOpen={isOpen}>
            {menuListItems.map((item, index) => (
              <MenuItemComponent
                item={item}
                index={index}
                handleSelectMenuItem={handleSelectMenuItem}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                hoveredIndex={hoveredIndex}
                isDisabled={item.disabled}
              />
            ))}
          </StyledMenuList>
        </StyledSliderMenu>
      </MenuWrapper>
    </Grid>
  );
};

export default DashboardSideBarMenu;
