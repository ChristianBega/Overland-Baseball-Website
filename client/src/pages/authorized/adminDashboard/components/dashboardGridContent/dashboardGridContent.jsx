import React from "react";
import { useModal } from "../../../../../setup/context/modal.context";
import MediaStorage from "./components/MediaStorage/mediaStorage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

const DashboardGridContent = () => {
  const { openModal } = useModal();
  const handleViewMediaStorage = () => {
    openModal(<MediaStorage />);
  };
  return (
    <div style={{ marginTop: "2rem", border: "2px solid grey", width: "100%", height: 600, padding: "1rem" }}>
      <div style={{ cursor: "pointer", border: "1px dotted blue", padding: "1rem" }} onClick={handleViewMediaStorage}>
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

export default DashboardGridContent;
