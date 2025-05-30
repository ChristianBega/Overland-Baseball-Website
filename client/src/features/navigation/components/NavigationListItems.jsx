// React
import React, { useContext, useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// MUI components
import { Link, Stack, Typography } from "@mui/material";
// Contexts
// import { UserContext } from "../../../setup/context/user.context";
import { UserContext } from "../../../features/auth/context/UserContext";
// Utils & Helpers
import useMediaQueries from "../../../utils/helpers/useMediaQueries.utils";
import { signOutUser } from "../../../features/auth/utils/authUtils";
// Styled components
import { StyledList, StyledListItem } from "./NavigationListItems.styles";
import { useRoleCheck } from "../../../hooks/useRoleCheck";
import { ROLES } from "../../../features/auth/utils/roles";
const NavigationListItems = ({ menuItems, handleClose, navListType }) => {
  const { currentUserProfile } = useContext(UserContext);
  console.log("currentUserProfile", currentUserProfile);
  const { isAuthenticated, hasRole } = useRoleCheck();
  const [currentMenuItems, setCurrentMenuItems] = useState(menuItems);
  const { isLg } = useMediaQueries();
  const navigate = useNavigate();
  const currentUrl = window.location.pathname;
  const filterMenuItems = (items) => {
    const menuPermissions = {
      "Dashboard": [ROLES.ADMIN, ROLES.COACH],
      "Documents": [ROLES.ADMIN, ROLES.COACH, ROLES.PLAYER],
      // Add other menu items with their allowed roles if needed
    };

    return items.filter((item) => {
      // Hide "Sign Out" if not authenticated, hide "Sign In"/"Sign Up" if authenticated
      if (!isAuthenticated) {
        if (["Sign Out"].includes(item.label)) return false;
      } else {
        if (["Sign In", "Sign Up"].includes(item.label)) return false;
      }

      // If the item requires certain roles, only show if authenticated and has the role
      if (menuPermissions[item.label]) {
        if (!isAuthenticated) return false;
        return menuPermissions[item.label].some((role) => hasRole(role));
      }

      // Otherwise, show the item
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
          <Link
            component={RouterLink}
            key={label}
            // className={navListType === "navigation-menu" || navListType === "account-menu" ? "normal-shadow" : ""}
          >
            <Stack direction="row" alignItems="center" gap={1} className={currentUrl === url ? "active-link" : "inactive-link"}>
              {isLg && navListType === "navigation-menu" ? null : <>{icon}</>}
              <Typography variant="h6" sx={{ fontSize: "16px" }}>
                {label}
              </Typography>
            </Stack>
          </Link>
        </StyledListItem>
      ))}
    </StyledList>
  );
};

export default NavigationListItems;
