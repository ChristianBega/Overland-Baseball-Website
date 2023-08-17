import styled from "@emotion/styled";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import PlayerEvents from "./playerEvents.component";
import Toggles from "./toggles.component";
import RegistrationModal from "../modals/registrationModal.component";

import { springWorkoutsData, summerWorkoutsData, fallWorkoutsData } from "../../websiteData/events.data";

const StyledInfoBox = styled(Box)(({ theme }) => ({
  minWidth: "350px",
  maxWidth: "600px",
  minHeight: "100%",
  margin: "auto",
  display: "flex",
  flex: "1",
  flexDirection: "column",
  justifyContent: "center",
}));

export default function Workouts({ isMobile }) {
  // when the state changes
  const [currentSeason, setCurrentSeason] = useState("spring");
  const [currentEventData, setCurrentEventData] = useState([]);

  useEffect(() => {
    if (currentSeason === "spring") {
      setCurrentEventData(springWorkoutsData);
    } else if (currentSeason === "summer") {
      setCurrentEventData(summerWorkoutsData);
    } else {
      setCurrentEventData(fallWorkoutsData);
    }
  }, [currentSeason]);

  return (
    <Grid item xs={12} md={8} sx={{ minHeight: "375px", padding: { xs: 0, md: 8 } }}>
      <StyledInfoBox>
        {!isMobile && (
          <div style={{ display: "flex", gap: "3rem" }}>
            <Typography typography="h2">Workouts</Typography>
            <Toggles setCurrentSeason={setCurrentSeason} currentSeason={currentSeason} />
          </div>
        )}
        <PlayerEvents currentEventData={currentEventData} currentSeason={currentSeason} setCurrentSeason={setCurrentSeason} isMobile={isMobile} />

        <RegistrationModal
          setCurrentSeason={setCurrentSeason}
          datatypeRegistration="workouts"
          currentEventData={currentEventData}
          setCurrentEventData={setCurrentEventData}
        />
      </StyledInfoBox>
    </Grid>
  );
}
