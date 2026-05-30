import { Drawer, styled } from "@mui/material";

export const StyledDrawerMenu = styled(Drawer)(({ theme }) => ({
  background: "rgba(0, 0, 0, 0.4)",
  width: "100%",
  "& .MuiDrawer-paper": {
    width: "350px",
  },
}));
