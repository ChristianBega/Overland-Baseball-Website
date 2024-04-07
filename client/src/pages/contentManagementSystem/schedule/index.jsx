import React from "react";
import { Container } from "@mui/material";
import Schedule from "../../unauthorized/home/components/schedule/schedule.component";

const CMSSchedule = () => {
  return (
    <Container>
      <Schedule editPrivilege="admin" />
    </Container>
  );
};

export default CMSSchedule;
