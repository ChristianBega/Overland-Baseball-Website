import React from "react";
import { Container } from "@mui/material";
import { useUrlQueryParams } from "../../../../setup/utils/helpers/useUrlQueryParams";
import CreateRosterItemForm from "./components/createRosterItemForm";
import CreateScheduleItemForm from "./components/createScheduleItemForm";

const CMSCreateItemPage = () => {
  let queryParams = useUrlQueryParams();
  let type = queryParams.get("type");
  let role = queryParams.get("role");
  let uid = queryParams.get("uid");
  return (
    <Container>
      {type === "schedule" && <CreateScheduleItemForm />}
      {type === "roster" && <CreateRosterItemForm />}
    </Container>
  );
};

export default CMSCreateItemPage;
