import React, { useContext, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import { UserContext } from "../../../features/auth/context/UserContext";
import DashboardSideBarMenu from "../components/DashboardSideBarMenu";
import { useNavigate } from "react-router-dom";
import { CmsCreateItemProvider } from "../../../features/cms/context/CmsCreate.context";
import { CmsEditItemProvider } from "../../../features/cms/context/CmsEdit.context";
import { CmsBulkActionProvider } from "../../../features/cms/context/CmsBulkActions.context";
import AdminQuickTasksView from "../components/AdminQuickTasksView";
import { MediaStorageProvider } from "../../../features/cms/context/CmsMediaStorage.context";
import { CmsItemTableView } from "../../../features/cms";
import { CmsContext } from "../../../features/cms/context/CmsContext";
import { CmsDeleteItemProvider } from "../../../features/cms/context/CmsDelete.context";
// import { ModalProvider } from "../../setup/context/modal.context";
import SectionLayout from "../../../features/ui/components/SectionLayout";
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
    <Container sx={{ display: "flex", justifyContent: " center" }} id="admin-dashboard-page" component="main" aria-label="Admin Dashboard Page">
      {currentUserProfile.role !== "admin" && currentUserProfile.role !== "coach" ? null : (
        <SectionLayout id="admin-dashboard-section" aria-label="Admin Dashboard Section" marginBlock>
          <Grid id="dashboard-main-grid" container maxWidth="lg">
            <DashboardSideBarMenu />
            <CmsBulkActionProvider>
              <MediaStorageProvider>
                <CmsCreateItemProvider>
                  <CmsEditItemProvider>
                    <CmsDeleteItemProvider>
                      {/* <ModalProvider> */}
                      {currentItem?.linkName === "dashboard" ? <AdminQuickTasksView /> : <CmsItemTableView currentItem={currentItem} />}
                      {/* </ModalProvider> */}
                    </CmsDeleteItemProvider>
                  </CmsEditItemProvider>
                </CmsCreateItemProvider>
              </MediaStorageProvider>
            </CmsBulkActionProvider>
          </Grid>
        </SectionLayout>
      )}
    </Container>
  );
};

export default AdminDashboardPage;
