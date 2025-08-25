// MUI components
import React from "react";
import { Container, Grid } from "@mui/material";

// Components
import { Navigation } from "../../navigation";
import SectionHeader from "../../ui/components/SectionHeader";
import SearchFilterComponent from "../../ui/components/SearchFilter";
import TeamRoster from "../components/TeamRoster.jsx";
import Staff from "../components/Staff.jsx";
import useMediaQueries from "../../../utils/helpers/useMediaQueries.utils";

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
