import { Link, List, ListItem, Stack, styled } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../setup/context/authentication.context";
import { UserContext } from "../../../../setup/context/user.context";
import useMediaQueries from "../../../../setup/utils/helpers/useMediaQueries.utils";
import { signOutUser } from "../../../../setup/utils/firebase/authentication";

const StyledList = styled(List)(({ theme, navListType }) => ({
  color: theme.palette.primary.main,
  display: "flex",
  flexDirection: "column",
  // overflowX: "hidden",
  // rowGap: theme.spacing(4),
  minWidth: "60vw",
  // paddingInline: theme.spacing(4),
  // padding: theme.spacing(0),
  [theme.breakpoints.up("sm")]: {
    minWidth: "50vw",
  },
  [theme.breakpoints.up("lg")]: {
    flexDirection: navListType === "account-menu" ? "column" : "row",
    width: "900px",
    justifyContent: "space-evenly",
  },
  // [theme.breakpoints.down("lg")]: {
  //   height: "100vh",
  // },
}));
const StyledListItem = styled(ListItem)(({ theme }) => ({
  "&:hover": {
    backgroundColor: "#f1f1f18e",
    transition: "all .3s ease-in-out",
    "& a": {
      transform: "scale(1.05)",
      transition: "all .3s ease-in-out",
    },
  },
  padding: "1rem",
  borderTop: `1px solid ${theme.palette.borders.primary}`,
  [theme.breakpoints.up("lg")]: {
    display: "flex",
    justifyContent: "space-evenly",
    width: "130px",
    borderTop: "none",
  },
  [theme.breakpoints.down("lg")]: {
    "&:last-child": {
      borderBottom: `1px solid ${theme.palette.borders.primary}`,
    },
  },
}));

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
          return true; // Show all items
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
        <StyledListItem key={label} onClick={handleClick} id={label} data-url={url}>
          <Link component={RouterLink} key={label}>
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
