import { IconButton, List, ListItem, styled, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { Link } from "react-router-dom";

// Navigation menu item data
const menuItemData = [
  { linkName: "Home", urlPath: "/" },
  { linkName: "Rooster", urlPath: "/rooster" },
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
  flexDirection: "column",
  justifyContent: "space-between",
  rowGap: theme.spacing(4), // 16px
  minWidth: "100vw",
  [theme.breakpoints.down("md")]: {
    minWidth: "50vw",
  },
  [theme.breakpoints.up("md")]: {
    minWidth: "60vw",
  },
  [theme.breakpoints.up("lg")]: {
    flexDirection: "row",
  },
}));
const StyledListItem = styled(ListItem)(({ theme }) => ({
  textAlign: "center",
  minWidth: "55px",
  // [theme.breakpoints.up("lg")]: {},
}));

// Get menu items
const getMenuItems = (handleClose) => (
  <StyledList>
    {menuItemData.map((menuItem, index) => (
      <StyledListItem onClick={handleClose}>
        <Link to={menuItem.urlPath} key={menuItem.linkName}>
          <Typography typography={"linkTextDesktop"} sx={{ display: { sm: "none", lg: "flex" } }}>
            {menuItem.linkName}
          </Typography>

          <Typography typography={"linkTextMobile"} sx={{ display: { sm: "flex", lg: "none" } }}>
            {menuItem.linkName}
          </Typography>
        </Link>
      </StyledListItem>
    ))}
  </StyledList>
);

export default function NavigationListItems({ handleClose }) {
  // const [menuData, setMenuData] = useState(menuItemData);
  return <>{getMenuItems(handleClose)}</>;
}
