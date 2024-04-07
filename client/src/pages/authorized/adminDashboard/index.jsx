import React from "react";
import { Container, List, ListItem } from "@mui/material";
import { Link } from "react-router-dom";
const AdminDashboardPage = () => {
  return (
    <Container>
      <List>
        <ListItem>
          <Link to="/cms-edit-page?type=schedule">Click here to edit your: schedule</Link>
        </ListItem>
        <ListItem>Click here to edit your: events</ListItem>
        <ListItem>Click here to edit your: quick links</ListItem>
        <ListItem>Click here to edit your: roster</ListItem>
      </List>
    </Container>
  );
};

export default AdminDashboardPage;
