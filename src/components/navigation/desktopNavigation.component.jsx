// Mui components
import { Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";

// Components
import NavigationListItems from "./navigationListItems.component";
import OverlandLogo from "./logo.component";
import Account from "./account.component";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "none",
  justifyContent: "space-between",
  textAlign: "center",
  padding: theme.spacing(4),
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
        <OverlandLogo />
        {/* <Typography typography="h2">Overland Baseball</Typography> */}
        <NavigationListItems />
        <Account />
      </StyledToolbar>
    </>
  );
}
