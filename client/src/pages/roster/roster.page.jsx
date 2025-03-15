import React from "react";
import { Container, Grid } from "@mui/material";
import useMediaQueries from "../../setup/utils/helpers/useMediaQueries.utils";
import TeamRoster from "./components/teamRoster/teamRoster.component";
import Staff from "./components/staff/staff.component";

export default function RosterPage() {
  const { isLg } = useMediaQueries();

  return (
    <>
      <Container component="main" id="roster-page" aria-label="Roster Page">
        <Grid container id="roster-page-grid" columnSpacing={isLg ? 6 : 4}>
          
          <TeamRoster currentTeam={"varsity"} />
          <Staff currentTeam={"varsity"} />
        </Grid>
      </Container>
    </>
  );
}
