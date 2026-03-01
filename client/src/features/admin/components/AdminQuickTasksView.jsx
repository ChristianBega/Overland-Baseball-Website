// Todo: needs to be a grid item
// MUI components
import { Box, Grid, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Components
import { useModal } from "../../../features/ui";
// Utils
import { useCheckAuthorization } from "../../../utils/helpers/checkAuthorization";
import { UserContext } from "../../../features/auth/context/UserContext";
import { auth } from "../../../utils/firebase/index.firebase";

const quickTaskConfig = [
  {
    task: "Manage Pages",
    component: "<ManagePages />",
    description: "View all pages on the website, edit them, add new pages, delete pages, etc...",
    action: (openLink, link) => openLink(link, "_blank"),
    link: import.meta.env.MODE === "production" ? import.meta.env.REACT_APP_STRAPI_AUTH_LOGIN_PORTAL : import.meta.env.REACT_APP_STRAPI_AUTH_LOGIN_PORTAL_DEV,
    type: "link",
  },
  {
    task: "Manage Cms AI",
    component: "<ManagePages />",
    description: "View all pages on the website, edit them, add new pages, delete pages, etc with AI assistance",
    action: async () => {
      try {
        const voiceCmsUrl =
          import.meta.env.MODE === "production"
            ? import.meta.env.REACT_APP_VOICE_CMS_URL
            : import.meta.env.REACT_APP_VOICE_CMS_URL_DEV;

        // Open window IMMEDIATELY (synchronous) to satisfy mobile popup blockers
        // Mobile browsers block window.open if called after an await
        const newWindow = window.open("about:blank", "_blank");

        // Now do the async work
        const token = await auth.currentUser.getIdToken(/* forceRefresh */ true);

        // Update the already-opened window's URL
        if (newWindow) {
          newWindow.location.href = `${voiceCmsUrl}?token=${token}`;
        }
      } catch (err) {
        console.error("Failed to open Voice CMS:", err);
      }
    },
    type: "custom",
  },
  // {
  //   task: "Manage Cms AI",
  //   component: "<ManagePages />",
  //   description: "View all pages on the website, edit them, add new pages, delete pages, etc with AI assistance",
  //   action: async () => {
  //     try {
  //       const token = await auth.currentUser.getIdToken();

  //       const voiceCmsUrl = process.env.NODE_ENV === "production" ? process.env.REACT_APP_VOICE_CMS_URL : process.env.REACT_APP_VOICE_CMS_URL_DEV;

  //       const res = await fetch(`${voiceCmsUrl}/api/auth/session`, {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         credentials: "include",
  //         body: JSON.stringify({ idToken: token }),
  //       });

  //       if (!res.ok) throw new Error("Session creation failed");

  //       window.open(voiceCmsUrl, "_blank");
  //     } catch (err) {
  //       console.error("Failed to open Voice CMS:", err);
  //     }
  //   },
  //   type: "custom",
  // },
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
    } else if (task.type === "custom") {
      task.action();
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
