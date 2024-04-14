import React from "react";
import { useUrlQueryParams } from "../../../setup/utils/helpers/useUrlQueryParams";
import { Container } from "@mui/material";
import CMSSchedule from "../schedule";
import { Link } from "react-router-dom";
import CMSRoster from "../roster";

// import { bulkAddDocuments } from "../../../setup/utils/firebase/addItem";

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
      {type === "schedule" && <CMSSchedule />}
      {type === "roster" && <CMSRoster />}
    </Container>
  );
};

export default CMSEditPage;
