import React from "react";
import { Container, Grid } from "@mui/material";
import useMediaQueries from "../../../utils/helpers/useMediaQueries.utils";
import TeamRoster from "../components/TeamRoster.jsx";
import Staff from "../components/Staff.jsx";
import { Navigation } from "../../navigation";

export default function RosterPage() {
  const { isLg } = useMediaQueries();

  return (
    <>
      <Navigation />
      <Container component="main" id="roster-page" aria-label="Roster Page">
        <Grid container id="roster-page-grid" columnSpacing={isLg ? 6 : 4}>
          <TeamRoster currentTeam={"varsity"} />
          <Staff currentTeam={"varsity"} />
        </Grid>
      </Container>
    </>
  );
}
