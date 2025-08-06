// React
import React, { useContext, useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// MUI components
import { Stack } from "@mui/material";
// Contexts
import { UserContext } from "../../../features/auth/context/UserContext";
// Utils & Helpers
import useMediaQueries from "../../../utils/helpers/useMediaQueries.utils";
import { signOutUser } from "../../../features/auth/utils/authUtils";
import { useRoleCheck } from "../../../hooks/useRoleCheck";
import { ROLES } from "../../../features/auth/utils/roles";
// Components
import { StyledList, StyledListItem, StyledNavigationLink, StyledNavigationTypography } from "./NavigationListItems.styles";

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
      {currentMenuItems?.map(({ label, url, icon }) => (
        <StyledListItem url={url} currentUrl={currentUrl} navListType={navListType} key={label} onClick={handleClick} id={label} data-url={url}>
          <StyledNavigationLink component={RouterLink} key={label} currentUrl={currentUrl} url={url}>
            <Stack direction="row" alignItems="center" gap={1} className={currentUrl === url ? "active-link" : "inactive-link"}>
              {isLg && navListType === "navigation-menu" ? null : <>{icon}</>}
              <StyledNavigationTypography variant="h6">{label}</StyledNavigationTypography>
            </Stack>
          </StyledNavigationLink>
        </StyledListItem>
      ))}
    </StyledList>
  );
};

export default NavigationListItems;
