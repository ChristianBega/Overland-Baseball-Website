import React, { useContext } from "react";
import { useModal } from "../../../../../setup/context/modal.context";
import CmsMediaStorage from "../../../../../components/contentManagementSystem/cmsMediaStorage/cmsMediaStorage";
import { useCheckAuthorization } from "../../../../../setup/utils/helpers/checkAuthorization";
import { UserContext } from "../../../../../setup/context/user.context";
import { useTheme } from "@emotion/react";

const AdminQuickTasksView = () => {
  const { openModal } = useModal();
  const { theme } = useTheme();
  const { currentUserProfile } = useContext(UserContext);
  const { role } = currentUserProfile;
  const checkAuthorization = useCheckAuthorization();

  const handleQuickTask = () => {
    if (!checkAuthorization(role)) return;
    openModal(<CmsMediaStorage />, "mediaStorage");
  };
  return (
    <div style={{ marginTop: "2rem", border: "2px solid grey", width: "100%", height: 600, padding: "1rem" }}>
      <div style={{ cursor: "pointer", border: "1px dotted blue", padding: "1rem" }} onClick={handleQuickTask}>
        <p>Media Storage</p>
      </div>
      <p>User management - manage all users on the website - update, delete, add new users...</p>
      <p>
        Sign Up history - manage all sign up history for each user, what events they have signed up for, sign up statistics with charts on who's
        attending which event, etc....
      </p>
    </div>
  );
};

export default AdminQuickTasksView;
