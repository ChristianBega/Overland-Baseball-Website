import React, { useEffect, useState } from "react";
import { Grid, Paper, Table, TableBody, TableContainer, Typography } from "@mui/material";
// Components
import TeamRosterItem from "../teamRosterItem/teamRosterItem.component";
import { fetchCMSItems } from "../../../../../setup/utils/firebase/getItem";
import { useQuery } from "@tanstack/react-query";

export default function TeamRoster({ currentTeam }) {
  const [currentRoster, setCurrentRoster] = useState([]);
  const { data, isLoading, error } = useQuery({ queryKey: ["roster"], queryFn: () => fetchCMSItems("roster") });
  useEffect(() => {
    if (currentTeam === "varsity" && !isLoading) {
      setCurrentRoster(data);
    } else if (currentTeam === "juniorVarsity") {
      // Logic for setting juniorVarsityRoster
    } else {
      // Logic for setting freshmanRoster
    }
  }, [currentTeam, isLoading, data]);

  if (isLoading) {
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>Loading...</div>;
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Typography variant="h6" color="error">
          Error fetching data
        </Typography>
      </div>
    );
  }

  if (!currentRoster || currentRoster.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Typography variant="h6">No data available</Typography>
      </div>
    );
  }

  return (
    <section id="team-rooster-section" style={{ width: "100%" }}>
      <Grid item xs={12} md={12} sx={{ mt: 4 }}>
        <TableContainer component={Paper} sx={{ display: "flex", justifyContent: "center", flexDirection: "column", paddingBlock: ".5rem" }}>
          <Table aria-label="roster table">
            <TableBody>
              <TeamRosterItem currentRoster={currentRoster} />
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </section>
  );
}
