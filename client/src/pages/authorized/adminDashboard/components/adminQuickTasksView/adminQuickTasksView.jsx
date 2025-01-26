import React, { useContext } from "react";
import { useModal } from "../../../../../setup/context/modal.context";
import CmsMediaStorage from "../../../../../components/contentManagementSystem/cmsMediaStorage/cmsMediaStorage";
import { useCheckAuthorization } from "../../../../../setup/utils/helpers/checkAuthorization";
import { UserContext } from "../../../../../setup/context/user.context";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const quickTaskConfig = [
  {
    task: "Player Stats",
    component: "<PlayerStats />",
    description: "Coming soon - batting average, on base percentage, etc...",
    action: (navigate) => navigate("/player-stats"),
  },
  {
    // ! take a picture of your game score, create a virtual version, allow for editing, sharing, and AI analysis of the game
    task: "Game Score Cards",
    component: "<GameScoreCards />",
    description: "Coming soon - view all game score cards, add new game score cards, edit game score cards, delete game score cards...",
    action: (navigate) => navigate("/game-score-cards"),
  },
  {
    task: "Events Sign Ups",
    component: "<Events />",
    description: "View all events sign ups, filter by event, user, date, etc...",
    action: (navigate) => navigate("/events"),
  },
  {
    task: "Form Analytics",
    description: "View all form submissions and their analytics - who's signed up for what, what events they've signed up for, etc...",
    component: "<FormAnalytics />",
    action: (navigate) => navigate("/form-analytics"),
  },
  {
    task: "User Management",
    component: "<CmsUserManagement />",
    description: "Manage all users on the website - update, delete, add new users, manage roles, etc...",
    action: (navigate) => navigate("/user-management"),
  },
  {
    task: "Incoming Emails",
    component: "<IncomingEmails />",
    description: "View all incoming emails, filter by sender, subject, date, etc...",
    action: (navigate) => navigate("/incoming-emails"),
  },
  {
    task: "Media Storage",
    component: <CmsMediaStorage />,
    action: (openModal) => openModal(<CmsMediaStorage />, "mediaStorage"),
  },
  {
    task: "Website Analytics (GA4 Tracking) - coming soon (page views, clicks, ecom tracker, cart, etc...)",
    component: "<WebsiteAnalytics />",
    action: (navigate) => navigate("/website-analytics"),
  },
];

const AdminQuickTasksView = () => {
  const { openModal } = useModal();
  const { navigate } = useNavigate();
  const { currentUserProfile } = useContext(UserContext);
  const { role } = currentUserProfile;
  const checkAuthorization = useCheckAuthorization();

  const handleQuickTask = (taskAction) => {
    if (!checkAuthorization(role)) return;
    taskAction(openModal);
  };

  return (
    <div
      style={{
        marginTop: "2rem",
        border: "2px solid grey",
        width: "100%",
        height: 600,
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        display: "flex",
        overflow: "scroll",
      }}
    >
      {quickTaskConfig.map((task, index) => (
        <Box
          key={index}
          sx={{
            cursor: "pointer",
            border: "1px dotted blue",
            padding: "1rem",
            minWidth: { xs: "100%", sm: 600, md: 500 },
            maxWidth: { xs: "100%", sm: 600, md: 500 },
            height: "200px",
            margin: "auto",
          }}
          onClick={() => handleQuickTask(task.action)}
        >
          <Typography variant="h6" component="h2">
            {task.task}
          </Typography>
          <Typography variant="body1" component="p">
            {task.description}
          </Typography>
        </Box>
      ))}
    </div>
  );
};

export default AdminQuickTasksView;
// {
//   task: "Attendance Tracking",
//   component: "<AttendanceTracking />",
//   action: (navigate) => navigate("/attendance-tracking"),
// },
// {
//   task: "Chat/Direct Messaging",
//   component: "<ChatDirectMessaging />",
//   action: (navigate) => navigate("/chat-direct-messaging"),
// },
// {
//   task: "Payment Tracking",
//   component: "<PaymentTracking />",
//   action: (navigate) => navigate("/payment-tracking"),
// },
