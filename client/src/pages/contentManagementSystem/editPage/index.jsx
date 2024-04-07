import React from "react";
import { useUrlQueryParams } from "../../../setup/utils/helpers/useUrlQueryParams";
import { Container } from "@mui/material";
import CMSSchedule from "../schedule";

const CMSEditPage = () => {
  let queryParams = useUrlQueryParams();
  let type = queryParams.get("type");
  return <Container>{type === "schedule" && <CMSSchedule />}</Container>;
};

export default CMSEditPage;
