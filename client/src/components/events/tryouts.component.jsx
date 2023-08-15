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

export default function Workouts({ isMobile }) {
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
    <Grid item xs={12} md={8} sx={{ padding: { xs: 0, md: 8 } }}>
      <StyledInfoBox>
        {!isMobile && <Typography typography="h2">Tryouts</Typography>}
        <Toggles setCurrentSeason={setCurrentSeason} currentSeason={currentSeason} />
        <PlayerEvents currentEventData={currentEventData} />
        <RegistrationModal datatypeRegistration="tryouts" currentSeason={currentSeason} currentEventData={currentEventData} />
      </StyledInfoBox>
    </Grid>
  );
}
