import { useTheme } from "@emotion/react";
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
  const theme = useTheme();
  const [currentSeason, setCurrentSeason] = useState("spring");
  const [currentInfo, setCurrentInfo] = useState([]);

  useEffect(() => {
    if (currentSeason === "spring") {
      setCurrentInfo(springTryoutData);
    } else if (currentSeason === "summer") {
      setCurrentInfo(summerTryoutData);
    } else {
      setCurrentInfo(fallTryoutData);
    }
  }, [currentSeason]);

  return (
    <Grid item xs={12} md={8} sx={{ minHeight: "400px", maxHeight: { xs: "500px", md: "400px" }, my: 5 }}>
      <StyledInfoBox>
        <Typography typography="h2" sx={{ color: theme.palette.primary.main, textAlign: "center" }}>
          Tryouts
        </Typography>
        <Toggles setCurrentSeason={setCurrentSeason} currentSeason={currentSeason} />
        <PlayerEvents currentInfo={currentInfo} />
        <RegistrationModal datatypeRegistration="tryouts" currentSeason={currentSeason} />
      </StyledInfoBox>
    </Grid>
  );
}
