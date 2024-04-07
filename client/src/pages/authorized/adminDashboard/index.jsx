import React from "react";
import { Container, List, ListItem } from "@mui/material";
const AdminDashboardPage = () => {
  return (
    <Container>
      <List>
        <ListItem>Click here to edit your: schedule</ListItem>
        <ListItem>Click here to edit your: events</ListItem>
        <ListItem>Click here to edit your: quick links</ListItem>
        <ListItem>Click here to edit your: roster</ListItem>
      </List>
    </Container>
  );
};

export default AdminDashboardPage;
