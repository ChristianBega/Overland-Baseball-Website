import React, { useContext, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import { UserContext } from "../../../setup/context/user.context";
import DashboardSideBarMenu from "./components/dashboardSideBarMenu";
import { CmsContext } from "../../../setup/context/cms.context";
import { useNavigate } from "react-router-dom";
import { CmsCreateItemProvider } from "../../../setup/context/cmsCreate.context";
import { CmsEditItemProvider } from "../../../setup/context/cmsEdit.context";
import { CmsBulkActionProvider } from "../../../setup/context/cmsBulkActions.context";
import AdminQuickTasksView from "./components/adminQuickTasksView/adminQuickTasksView";
import { MediaStorageProvider } from "../../../setup/context/cmsContext/mediaStorage";
import CmsItemTableView from "../../../components/contentManagementSystem/cmsItemTableView";
const AdminDashboardPage = () => {
  const navigate = useNavigate();

  const { currentUserProfile } = useContext(UserContext);
  const { currentItem } = useContext(CmsContext);
  useEffect(() => {
    if (currentItem) {
      const newUrl = `/dashboard?type=${currentItem.linkName}&role=${currentUserProfile.role}&uid=${currentUserProfile.uid}`;
      navigate(newUrl);
    }
  }, [currentItem, currentUserProfile.role, currentUserProfile.uid]);

  return (
    <Container sx={{ display: "flex", justifyContent: " center" }}>
      {currentUserProfile.role !== "admin" ? null : (
        <Grid id="dashboard-main-grid" container maxWidth="lg">
          <DashboardSideBarMenu />
          <CmsBulkActionProvider>
            <MediaStorageProvider>
              <CmsCreateItemProvider>
                <CmsEditItemProvider>
                  {currentItem?.linkName === "dashboard" ? <AdminQuickTasksView /> : <CmsItemTableView currentItem={currentItem} />}
                  {/* <DashboardTableContent currentItem={currentItem} /> */}
                </CmsEditItemProvider>
              </CmsCreateItemProvider>
            </MediaStorageProvider>
          </CmsBulkActionProvider>
        </Grid>
      )}
    </Container>
  );
};

export default AdminDashboardPage;
