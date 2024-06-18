import React, { useContext } from "react";
import { Container, Grid } from "@mui/material";
import { UserContext } from "../../../setup/context/user.context";
import DashboardSideBarMenu from "./components/dashboardSideBarMenu";
import DashboardContentList from "./components/dashboardContentList";
// import { uploadImageAndSaveMetadata } from "../../../setup/utils/firebase/uploadImage";
const AdminDashboardPage = () => {
  const { currentUserProfile } = useContext(UserContext);

  return (
    <Container>
      {currentUserProfile.role !== "admin" ? null : (
        <Grid container>
          <DashboardSideBarMenu />
          <DashboardContentList />
        </Grid>
      )}
    </Container>
  );
};

export default AdminDashboardPage;
