import styled from "@emotion/styled";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import PlayerEvents from "./playerEvents.component";

import Toggles from "./toggles.component";
import { useTheme } from "@emotion/react";
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

export default function Workouts() {
  // when the state changes
  const [currentSeason, setCurrentSeason] = useState("spring");
  const [currentInfo, setCurrentInfo] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    if (currentSeason === "spring") {
      setCurrentInfo(springWorkoutsData);
    } else if (currentSeason === "summer") {
      setCurrentInfo(summerWorkoutsData);
    } else {
      setCurrentInfo(fallWorkoutsData);
    }
  }, [currentSeason]);

  return (
    <Grid item xs={12} md={6} sx={{ minHeight: "375px", mt: 5, mb: { xs: 15, sm: 0 } }}>
      <StyledInfoBox>
        <Typography typography="h2" sx={{ color: theme.palette.primary.main, textAlign: "center" }}>
          Workouts
        </Typography>
        <Toggles setCurrentSeason={setCurrentSeason} currentSeason={currentSeason} />
        <PlayerEvents currentInfo={currentInfo} />
        <RegistrationModal currentSeason={currentSeason} datatypeRegistration="workouts" />
      </StyledInfoBox>
    </Grid>
  );
}

// 1. toggles - spring , summer, fall
// 2. text content
// 3. faqs
// 4. documents
