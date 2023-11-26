import { Grid, Typography, styled } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import PlayerEvents from "../playerEvents/playerEvents.component";
import Toggles from "../toggles/toggles.component";
import RegistrationModal from "../../../../../components/modals/registrationModal.component";
import { springTryoutData, summerTryoutData, fallTryoutData } from "../../../../../websiteData/events.data";

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
  }, [currentSeason, currentEventData, setCurrentSeason]);

  return (
    <Grid item xs={12} md={8} sx={{ padding: { xs: 0, md: 8 } }}>
      <StyledInfoBox>
        {!isMobile && (
          <div style={{ display: "flex", gap: "3rem" }}>
            <Typography typography="h2">Tryouts</Typography>
            <Toggles setCurrentSeason={setCurrentSeason} currentSeason={currentSeason} />
          </div>
        )}
        <PlayerEvents currentEventData={currentEventData} currentSeason={currentSeason} setCurrentSeason={setCurrentSeason} isMobile={isMobile} />
        <RegistrationModal
          currentSeason={currentSeason}
          setCurrentSeason={setCurrentSeason}
          datatypeRegistration="tryouts"
          currentEventData={currentEventData}
          setCurrentEventData={setCurrentEventData}
        />
      </StyledInfoBox>
    </Grid>
  );
}
