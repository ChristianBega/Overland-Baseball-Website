import { IconButton, List, ListItem, styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { Link } from "react-router-dom";

// Navigation menu item data
const menuItemData = [
  { linkName: "Home", urlPath: "/" },
  { linkName: "Team Rooster", urlPath: "/rooster" },
  { linkName: "Events", urlPath: "/events" },
  { linkName: "Boosters", urlPath: "/boosters" },
  { linkName: "Documents", urlPath: "/documents" },
  { linkName: "Alumni", urlPath: "/" },
  { linkName: "Sponsors", urlPath: "/" },
];

// Styled Components
const StyledList = styled(List)(({ theme }) => ({
  color: theme.palette.primary.main,
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  rowGap: theme.spacing(4), // 16px
  minWidth: "100vw",
  [theme.breakpoints.up("md")]: {
    minWidth: "50vw",
  },
}));
const StyledListItem = styled(ListItem)(({ theme }) => ({
  width: "80%",
  color: theme.palette.primary.main,
  fontSize: "25px",

  [theme.breakpoints.up("md")]: {
    fontSize: "18px",
  },
}));

// Get menu items
const getMenuItems = (handleClose) => (
  <StyledList>
    {menuItemData.map((menuItem, index) => (
      <StyledListItem onClick={handleClose}>
        <Link to={menuItem.urlPath} key={menuItem.linkName}>
          {menuItem.linkName}
        </Link>
      </StyledListItem>
    ))}
  </StyledList>
);

export default function NavigationListItems({ handleClose }) {
  // const [menuData, setMenuData] = useState(menuItemData);
  return (
    <>
      <IconButton onClick={handleClose} color="primary.main" aria-label="exit menu">
        <CloseIcon />
      </IconButton>
      {getMenuItems(handleClose)}
    </>
  );
}
