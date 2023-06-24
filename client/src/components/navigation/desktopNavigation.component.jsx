// Mui components
import { Box, Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";

// Components
import NavigationListItems from "./navigationListItems.component";
import OverlandLogo from "./logo.component";
// import Account from "./account.component";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "none",
  justifyContent: "space-between",
  color: theme.palette.text.primary,
  background: theme.palette.primary.main,
  [theme.breakpoints.up("lg")]: {
    display: "flex",
    padding: theme.spacing(5, 10),
  },
}));
export default function DesktopNavigation() {
  return (
    <>
      <StyledToolbar>
        <OverlandLogo />
        {/* <Typography typography="h2">Overland Baseball</Typography> */}
        <NavigationListItems />
        {/* <Account /> */}
        <Box></Box>
      </StyledToolbar>
    </>
  );
}
