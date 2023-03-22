import styled from "@emotion/styled";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import PlayerEvents from "./playerEvents.component";

import Toggles from "./toggles.component";

const springData = [
  {
    infoType: "spring",
    content:
      "Spring ... ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    documents: ["1", "2", "3", "4"],
    faqs: ["1", "2", "3", "4"],
  },
];
const summerData = [
  {
    infoType: "summer",
    content:
      "Summer ... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
    documents: ["1", "2", "3", "4"],
    faqs: ["1", "2", "3", "4"],
  },
];
const fallData = [
  {
    infoType: "fall",
    content:
      "Fall ... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
    documents: ["1", "2", "3", "4"],
    faqs: ["1", "2", "3", "4"],
  },
];
const StyledInfoBox = styled(Box)(({ theme }) => ({
  minWidth: "400px",
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
        <Typography typography="h3" textAlign="center">
          Workouts
        </Typography>
        <Toggles setCurrentSeason={setCurrentSeason} />
        <PlayerEvents currentInfo={currentInfo} />
      </StyledInfoBox>
    </Grid>
  );
}

// 1. toggles - spring , summer, fall
// 2. text content
// 3. faqs
// 4. documents
