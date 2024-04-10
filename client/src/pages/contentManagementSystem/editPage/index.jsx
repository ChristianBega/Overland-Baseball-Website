import React from "react";
import { useUrlQueryParams } from "../../../setup/utils/helpers/useUrlQueryParams";
import { Container } from "@mui/material";
import CMSSchedule from "../schedule";
import { Link } from "react-router-dom";
import CMSRoster from "../roster";
import CmsListItem from "../cmsListItem";

// import { bulkAddDocuments } from "../../../setup/utils/firebase/addItem";

// add - home, away, userUid : "Hlmu2Cdx4lSuN8HiIiMq6YJBa8j2", role : "admin"
const CMSEditPage = () => {
  let queryParams = useUrlQueryParams();
  let type = queryParams.get("type");
  let role = queryParams.get("role");
  let uid = queryParams.get("uid");

  const btnTypeName = type[0].toUpperCase() + type.slice(1);
  // const handleAddItems = () => {
  //   bulkAddDocuments(scheduleEntries2023);
  // };

  return (
    <Container>
      <Link to={`/cms-create?type=${type}&role=${role}&uid=${uid}`}>Add New {btnTypeName} Item</Link>
      {/* <button onClick={handleAddItems}>Bulk Add Schedule Items</button> */}
      <button>Remove {btnTypeName} Item</button>
      <button>Edit {btnTypeName} Item</button>
      {type === "schedule" && <CMSSchedule />}
      {type === "roster" && <CMSRoster />}
    </Container>
  );
};

export default CMSEditPage;
