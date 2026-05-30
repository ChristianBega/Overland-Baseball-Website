// React
import React, { useContext, useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// MUI components
import { Stack, Typography } from "@mui/material";
// Contexts
import { UserContext } from "../../../features/auth/context/UserContext";
// Utils & Helpers
import useMediaQueries from "../../../utils/helpers/useMediaQueries.utils";
import { signOutUser } from "../../../features/auth/utils/authUtils";
import { useRoleCheck } from "../../../hooks/useRoleCheck";
import { ROLES } from "../../../features/auth/utils/roles";
// Components
import { StyledList, StyledListItem, StyledNavigationLink } from "./NavigationListItems.styles";

const NavigationListItems = ({ menuItems, handleClose, navListType }) => {
  const { currentUserProfile } = useContext(UserContext);
  const { isAuthenticated, hasRole } = useRoleCheck();
  const [currentMenuItems, setCurrentMenuItems] = useState(menuItems);
  const { isLg } = useMediaQueries();
  const navigate = useNavigate();
  const currentUrl = window.location.pathname;

  const filterMenuItems = (items) => {
    const menuPermissions = {
      "Dashboard": [ROLES.ADMIN, ROLES.COACH],
      "Documents": [ROLES.ADMIN, ROLES.COACH, ROLES.PLAYER],
    };

    return items.filter((item) => {
      if (!isAuthenticated) {
        if (["Sign Out"].includes(item.label)) return false;
      } else {
        if (["Sign In", "Sign Up"].includes(item.label)) return false;
      }

      if (menuPermissions[item.label]) {
        if (!isAuthenticated) return false;
        return menuPermissions[item.label].some((role) => hasRole(role));
      }

      return true;
    });
  };

  useEffect(() => {
    const filteredMenuItems = filterMenuItems(menuItems);
    setCurrentMenuItems(filteredMenuItems);
  }, [menuItems, isAuthenticated, currentUserProfile?.role]);

  const handleClick = (e) => {
    if (e.currentTarget.id.toLowerCase() === "sign out") {
      signOutUser().then(() => {
        navigate("/");
        handleClose();
      });
    } else {
      navigate(e.currentTarget.dataset.url);
      handleClose();
    }
  };

  return (
    <StyledList navListType={navListType}>
      {currentMenuItems?.map(({ label, url, icon, href }) => (
        <StyledListItem url={url} currentUrl={currentUrl} navListType={navListType} key={label} onClick={handleClick} id={label} data-url={url}>
          {/* if no url but href, use normal link */}
          <StyledNavigationLink
            component={!url ? "a" : RouterLink}
            key={label}
            currentUrl={currentUrl}
            url={url}
            href={href}
            target={href ? "_blank" : "_self"}
            rel={href ? "noopener noreferrer" : ""}
          >
            <Stack
              direction="row"
              alignItems="center"
              gap={1}
              className={currentUrl === url && navListType !== "navigation-menu-footer" ? "active-link" : "inactive-link"}
            >
              {isLg && navListType === "navigation-menu" ? null : <>{icon}</>}
              <Typography
                component="span"
                variant="p"
                className={navListType === "navigation-menu-footer" ? "light-text" : ""}
                sx={{ fontSize: "16px", marginBottom: "0", color: "inherit !important" }}
              >
                {label}
              </Typography>
            </Stack>
          </StyledNavigationLink>
        </StyledListItem>
      ))}
    </StyledList>
  );
};

export default NavigationListItems;
