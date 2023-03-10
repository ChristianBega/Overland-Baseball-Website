// Mui components
import { Typography, Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";
import NavigationListItems from "./navigationListItems.component";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "none",
  justifyContent: "space-between",
  textAlign: "center",
  // spacing: theme.spacing(19),
  padding: theme.spacing(4, 6), // 16px 24px
  color: theme.palette.text.primary,
  background: theme.palette.primary.main,
  [theme.breakpoints.up("lg")]: {
    display: "flex",
  },
}));
export default function DesktopNavigation() {
  return (
    <>
      <StyledToolbar>
        <Typography typography="h2">Overland Baseball</Typography>
        <NavigationListItems />
      </StyledToolbar>
    </>
  );
}
