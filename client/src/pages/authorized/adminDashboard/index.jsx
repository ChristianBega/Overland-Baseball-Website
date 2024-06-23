import React, { useContext } from "react";
import { Container, Grid, useMediaQuery } from "@mui/material";
import { UserContext } from "../../../setup/context/user.context";
import DashboardSideBarMenu from "./components/dashboardSideBarMenu";
import DashboardContentList from "./components/dashboardContentList";
import { useTheme } from "@emotion/react";
// import { uploadImageAndSaveMetadata } from "../../../setup/utils/firebase/uploadImage";
const AdminDashboardPage = () => {
  const theme = useTheme();
  const { currentUserProfile } = useContext(UserContext);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Container sx={{ display: "flex", justifyContent: " center" }}>
      {currentUserProfile.role !== "admin" ? null : (
        <Grid id="dashboard-main-grid" container maxWidth="lg" rowSpacing={isMobile ? 12 : 32}>
          <DashboardSideBarMenu />
          <DashboardContentList />
        </Grid>
      )}
    </Container>
  );
};

export default AdminDashboardPage;
