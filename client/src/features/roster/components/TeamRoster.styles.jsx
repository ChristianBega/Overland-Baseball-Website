import { styled } from "@mui/material";
import { Box } from "@mui/material";

// Only keep roster-specific player styling components
// All table components moved to DataTable.jsx for reusability

// Player avatar styling - roster specific

// Todo - change to use TeamLogoAvatar or vice versa
export const StyledPlayerAvatar = styled(Box)(({ theme }) => ({
  width: 36,
  height: 36,
  borderRadius: "50%",
  backgroundColor: theme.palette.grey[300],
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.grey[600],
  fontWeight: "bold",
}));

// Player name link styling - roster specific
export const StyledPlayerLink = styled("p")(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: "none",
  fontWeight: 600, // Use the bolder weight for better hierarchy
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  maxWidth: "100px",
  margin: 0,
  [theme.breakpoints.up("rosterDataTable")]: {
    maxWidth: "150px",
  },
  [theme.breakpoints.up("lg")]: {
    maxWidth: "200px",
  },
}));

// Player image styling - roster specific
export const StyledPlayerImage = styled("img")({
  width: 36,
  height: 36,
  borderRadius: "50%",
  objectFit: "cover",
});
