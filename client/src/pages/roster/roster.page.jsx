import React, { useState } from "react";
import { Container, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { containerVariants } from "../../setup/framerAnimations/transitions";
// Components
import Staff from "./components/staff/staff.component";
// import Toggles from "../components/roster/toggles.component";
import TeamRoster from "./components/teamRoster/teamRoster.component";

export default function RosterPage() {
  // setCurrentTeam - prop used to track the currentTeams state when toggles are active.
  const [currentTeam] = useState("varsity");

  return (
    <>
      <Container
        component={motion.section}
        initial={containerVariants.hidden}
        animate={containerVariants.visible}
        exit={containerVariants.exit}
        transition={containerVariants.transition}
        id="rooster-section"
        style={{ display: "flex", justifyContent: " center", padding: ".5rem" }}
      >
        <Grid container maxWidth="lg" my={10}>
          <Staff currentTeam={currentTeam} />
          {/* <Toggles setCurrentTeam={setCurrentTeam} /> */}
          <TeamRoster currentTeam={currentTeam} />
        </Grid>
      </Container>
    </>
  );
}
