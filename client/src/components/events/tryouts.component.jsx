import { Grid, Typography, styled } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import PlayerEvents from "./playerEvents.component";
import Toggles from "./toggles.component";
import RegistrationModal from "../modals/registrationModal.component";
import { springTryoutData, summerTryoutData, fallTryoutData } from "../../websiteData/events.data";

const StyledInfoBox = styled(Box)(({ theme }) => ({
  minWidth: "350px",
  maxWidth: "600px",
  minHeight: "100%",
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));

export default function Workouts() {
  const [currentSeason, setCurrentSeason] = useState("spring");
  const [currentEventData, setCurrentEventData] = useState([]);

  useEffect(() => {
    if (currentSeason === "spring") {
      setCurrentEventData(springTryoutData);
    } else if (currentSeason === "summer") {
      setCurrentEventData(summerTryoutData);
    } else {
      setCurrentEventData(fallTryoutData);
    }
  }, [currentSeason]);

  return (
    <Grid item xs={12} md={8} sx={{ minHeight: "400px", maxHeight: { xs: "500px", md: "400px" }, my: 5 }}>
      <StyledInfoBox>
        <Typography typography="h2">Tryouts</Typography>
        <Toggles setCurrentSeason={setCurrentSeason} currentSeason={currentSeason} />
        <PlayerEvents currentEventData={currentEventData} />
        <RegistrationModal datatypeRegistration="tryouts" currentSeason={currentSeason} currentEventData={currentEventData} />
      </StyledInfoBox>
    </Grid>
  );
}
