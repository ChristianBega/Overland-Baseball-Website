// React
import React, { useContext, useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// MUI components
import { Link, Stack } from "@mui/material";
// Contexts
import { AuthContext } from "../../../../setup/context/authentication.context";
import { UserContext } from "../../../../setup/context/user.context";
// Utils & Helpers
import useMediaQueries from "../../../../setup/utils/helpers/useMediaQueries.utils";
import { signOutUser } from "../../../../setup/utils/firebase/authentication";
// Styled components
import { StyledList, StyledListItem } from "./navigationListItems.styles";

const NavigationListItems = ({ menuItems, handleClose, navListType }) => {
  const { isAuthorized } = useContext(AuthContext);
  const { currentUserProfile } = useContext(UserContext);
  const [currentMenuItems, setCurrentMenuItems] = useState(menuItems);
  const { isLg } = useMediaQueries();
  const navigate = useNavigate();

  const filterMenuItems = (items) => {
    let filteredItems = [];
    if (!isAuthorized) {
      filteredItems = items.filter((item) => item.label !== "Sign Out" && item.label !== "Settings");
    } else {
      filteredItems = items.filter((item) => item.label !== "Sign In" && item.label !== "Sign Up");
    }

    return filteredItems.filter((item) => {
      switch (currentUserProfile?.role) {
        case "admin":
        case "coach":
          return true;
        case "player":
          return item.label !== "Dashboard";
        case "parent":
          return item.label !== "Dashboard" && item.label !== "Documents";
        case "user":
          return item.label !== "Dashboard" && item.label !== "Documents";
        default:
          return item.label !== "Dashboard" && item.label !== "Documents";
      }
    });
  };

  useEffect(() => {
    const filteredMenuItems = filterMenuItems(menuItems);
    setCurrentMenuItems(filteredMenuItems);
  }, [menuItems, isAuthorized, currentUserProfile?.role]);

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
        <StyledListItem navListType={navListType} key={label} onClick={handleClick} id={label} data-url={url}>
          <Link
            component={RouterLink}
            key={label}
            className={navListType === "navigation-menu" || navListType === "account-menu" ? "normal-shadow" : ""}
          >
            <Stack direction="row" alignItems="center" gap={1}>
              {isLg && navListType === "navigation-menu" ? null : <>{icon}</>}
              {label}
            </Stack>
          </Link>
        </StyledListItem>
      ))}
    </StyledList>
  );
};

export default NavigationListItems;
