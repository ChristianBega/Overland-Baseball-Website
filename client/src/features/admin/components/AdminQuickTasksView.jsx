// Todo: needs to be a grid item
import React, { useContext } from "react";
import { useModal } from "../../../features/ui";
import { useCheckAuthorization } from "../../../utils/helpers/checkAuthorization";
import { UserContext } from "../../../features/auth/context/UserContext";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
// import { initializeBulkAddFields } from "../../../../../setup/utils/firebase/helper";

const quickTaskConfig = [
  {
    task: "Manage Pages",
    component: "<ManagePages />",
    description: "View all pages on the website, edit them, add new pages, delete pages, etc...",
    action: (openLink, link) => openLink(link, "_blank"),
    link: process.env.REACT_APP_STRAPI_AUTH_LOGIN_PORTAL,
    type: "link",
  },

  {
    task: "Events Sign Ups",
    component: "<Events />",
    description: "View all events sign ups, filter by event, user, date, etc...",
    action: (navigate) => navigate("/events"),
    type: "navigate",
  },
  {
    task: "User Management",
    component: "<CmsUserManagement />",
    description: "Manage all users on the website - update, delete, add new users, manage roles, etc...",
    action: (navigate) => navigate("/user-management"),
    type: "navigate",
  },

  // {
  //   // ! take a picture of your game score, create a virtual version, allow for editing, sharing, and AI analysis of the game
  //   task: "Game Score Cards",
  //   component: "<GameScoreCards />",
  //   description: "Coming soon - view all game score cards, add new game score cards, edit game score cards, delete game score cards...",
  //   action: (navigate) => navigate("/game-score-cards"),
  //   type: "navigate",
  // },

  // {
  //   task: "Form Analytics",
  //   component: "<FormAnalytics />",
  //   description: "View all form submissions and their analytics - who's signed up for what, what events they've signed up for, etc...",
  //   action: (navigate) => navigate("/form-analytics"),
  //   type: "navigate",
  // },

  // {
  //   task: "Incoming Emails",
  //   component: "<IncomingEmails />",
  //   description: "View all incoming emails, filter by sender, subject, date, etc...",
  //   action: (navigate) => navigate("/incoming-emails"),
  //   type: "navigate",
  // },

  // {
  //   task: "Website Analytics (GA4 Tracking) - coming soon (page views, clicks, ecom tracker, cart, etc...)",
  //   component: "<WebsiteAnalytics />",
  //   action: (navigate) => navigate("/website-analytics"),
  //   type: "navigate",
  // },
];

const AdminQuickTasksView = () => {
  const { openModal } = useModal();
  const navigate = useNavigate();
  const { currentUserProfile } = useContext(UserContext);
  const { role } = currentUserProfile;
  const checkAuthorization = useCheckAuthorization();
  const openLink = (link) => window.open(link, "_blank");

  const handleQuickTask = (task) => {
    if (!checkAuthorization(role)) return;

    if (task.type === "navigate") {
      task.action(navigate);
    } else if (task.type === "modal") {
      task.action(openModal);
    } else if (task.type === "link") {
      task.action(openLink, task.link);
    }
  };

  return (
    <Grid
      item
      xs={12}
      lg={12}
      style={{
        marginBlock: "2rem",
        border: "2px solid grey",
        width: "100%",
        height: 600,
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
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
          onClick={() => handleQuickTask(task)}
        >
          <Typography variant="h6" component="h2">
            {task.task}
          </Typography>
          <Typography variant="body1" component="p">
            {task.description}
          </Typography>
        </Box>
      ))}
    </Grid>
  );
};

export default AdminQuickTasksView;
