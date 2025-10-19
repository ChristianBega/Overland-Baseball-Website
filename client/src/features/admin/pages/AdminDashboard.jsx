import React, { useContext } from "react";
import { Container } from "@mui/material";
import { UserContext } from "../../../features/auth/context/UserContext";
import AdminQuickTasksView from "../components/AdminQuickTasksView";
import { Navigation } from "../../navigation";
const AdminDashboardPage = () => {
  const { currentUserProfile } = useContext(UserContext);

  return (
    <>
      <Navigation />
      <Container id="admin-dashboard-page" component="main" aria-label="Admin Dashboard Page">
        {currentUserProfile.role !== "admin" && currentUserProfile.role !== "coach" ? null : <AdminQuickTasksView />}
      </Container>
    </>
  );
};

export default AdminDashboardPage;
