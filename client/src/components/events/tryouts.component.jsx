import styled from "@emotion/styled";
import { Grid,  Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import PlayerEvents from "./playerEvents.component";
import Toggles from "./toggles.component";

const springData = [
  {
    infoType: "spring",
    content: "Information/news about spring tryouts... ",
    documents: ["1", "2", "3", "4"],
    faqs: ["1", "2", "3", "4"],
  },
];
const summerData = [
  {
    infoType: "summer",
    content: "Information/news about summer tryouts... ",
    documents: ["1", "2", "3", "4"],
    faqs: ["1", "2", "3", "4"],
  },
];
const fallData = [
  {
    infoType: "fall",
    content: "Information/news about fall tryouts... ",
    documents: ["1", "2", "3", "4"],
    faqs: ["1", "2", "3", "4"],
  },
];
const StyledInfoBox = styled(Box)(({ theme }) => ({
  maxWidth: "600px",
  minHeight: "100%",
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

export default function Workouts() {
  // when the state changes
  const [currentSeason, setCurrentSeason] = useState("spring");
  const [currentInfo, setCurrentInfo] = useState([]);

  useEffect(() => {
    if (currentSeason === "spring") {
      setCurrentInfo(springData);
    } else if (currentSeason === "summer") {
      setCurrentInfo(summerData);
    } else {
      setCurrentInfo(fallData);
    }
  }, [currentSeason]);

  return (
    <Grid item xs={12} md={6} sx={{ height: "400px" }}>
      <StyledInfoBox>
        <Typography typography="h3">Tryouts</Typography>
        <Toggles setCurrentSeason={setCurrentSeason} />
        <PlayerEvents currentInfo={currentInfo} />
      </StyledInfoBox>
    </Grid>
  );
}
