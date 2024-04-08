import React, { useContext } from "react";
import { Container, List, ListItem } from "@mui/material";
import { Link } from "react-router-dom";
import { UserContext } from "../../../setup/context/user.context";
import { uploadImageAndSaveMetadata } from "../../../setup/utils/firebase/uploadImage";
import Test from "./../../../assets/homePage/teamLogos/adamsCity.webp";

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
            <ListItem>
              Click here to edit your: events
              {/* <Link to={`/cms-edit?type=events&role=${currentUserProfile.role}&uid=${currentUserProfile.uid}`}> */}
              {/* </Link> */}
            </ListItem>
            <ListItem>Click here to edit your: quick links</ListItem>
            <ListItem>
              <Link to={`/cms-edit?type=roster&role=${currentUserProfile.role}&uid=${currentUserProfile.uid}`}>Click here to edit your: roster</Link>
            </ListItem>
          </List>
        </>
      )}
    </Container>
  );
};

export default AdminDashboardPage;
