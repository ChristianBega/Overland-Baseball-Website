import React, { useContext } from "react";
import { Container, List, ListItem } from "@mui/material";
import { Link } from "react-router-dom";
import { UserContext } from "../../../setup/context/user.context";
const AdminDashboardPage = () => {
  const { currentUserProfile } = useContext(UserContext);

  return (
    <Container>
      {currentUserProfile.role !== "admin" ? null : (
        <>
          <List>
            <ListItem>
              <Link to={`/cms-edit?type=schedule&role=${currentUserProfile.role}&uid=${currentUserProfile.uid}`}>
                Click here to edit your: schedule
              </Link>
            </ListItem>
            <ListItem>Click here to edit your: events</ListItem>
            <ListItem>Click here to edit your: quick links</ListItem>
            <ListItem>Click here to edit your: roster</ListItem>
          </List>
        </>
      )}
    </Container>
  );
};

export default AdminDashboardPage;
