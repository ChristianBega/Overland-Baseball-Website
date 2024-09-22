import React, { useContext, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import { UserContext } from "../../../setup/context/user.context";
import DashboardSideBarMenu from "./components/dashboardSideBarMenu";
import DashboardTableContent from "./components/DashboardTableContent";
import { useTheme } from "@emotion/react";
import { CmsContext } from "../../../setup/context/cms.context";
import { useNavigate } from "react-router-dom";
// import { uploadImageAndSaveMetadata } from "../../../setup/utils/firebase/uploadImage";
const AdminDashboardPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { currentUserProfile } = useContext(UserContext);
  const { currentItem } = useContext(CmsContext);
  // const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  // console.log("line 17", currentItem);
  useEffect(() => {
    if (currentItem) {
      const newUrl = `/dashboard?type=${currentItem.linkName}&role=${currentUserProfile.role}&uid=${currentUserProfile.uid}`;
      navigate(newUrl);
    }
  }, [currentItem, currentUserProfile.role, currentUserProfile.uid]);

  //  <Link to={`/cms-edit?type=schedule&role=${currentUserProfile.role}&uid=${currentUserProfile.uid}`}>Click here to edit your: schedule</Link>;

  // 1. Access currentItem state
  // 2. pass currentItem state to contentList
  // 3. contentList component runs a useQuery/fetch for appropriate data
  return (
    <Container sx={{ display: "flex", justifyContent: " center" }}>
      {currentUserProfile.role !== "admin" ? null : (
        <Grid id="dashboard-main-grid" container maxWidth="lg">
          <DashboardSideBarMenu />
          <DashboardTableContent currentItem={currentItem} />
        </Grid>
      )}
    </Container>
  );
};

export default AdminDashboardPage;
