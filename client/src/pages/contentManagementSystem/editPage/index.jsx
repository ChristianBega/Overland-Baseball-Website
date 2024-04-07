import React from "react";
import { useUrlQueryParams } from "../../../setup/utils/helpers/useUrlQueryParams";
import { Container } from "@mui/material";
import CMSSchedule from "../schedule";
import { Link } from "react-router-dom";

const CMSEditPage = () => {
  let queryParams = useUrlQueryParams();
  let type = queryParams.get("type");
  let role = queryParams.get("role");
  let uid = queryParams.get("uid");

  const btnTypeName = type[0].toUpperCase() + type.slice(1);

  return (
    <Container>
      <Link to={`/cms-create?type=schedule&role=${role}&uid=${uid}`}>Add New {btnTypeName} Item</Link>
      <button>Remove {btnTypeName} Item</button>
      <button>Edit {btnTypeName} Item</button>

      {type === "schedule" && <CMSSchedule />}
    </Container>
  );
};

export default CMSEditPage;
