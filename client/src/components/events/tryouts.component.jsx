import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import PlayerEvents from "./playerEvents.component";
import Toggles from "./toggles.component";
import RegistrationModal from "../modals/registrationModal.component";

const springData = [
  {
    infoType: "spring",
    date: "Feb 27-28th, 2023",
    location: "Overland Baseball Field",
    time: "4:00-6:00 PM",

    content: "Overland Baseball will hold Baseball tryouts on Feb 27th, 28th ",
    content2: "Player Equipment for Tryouts Uniform: Baseball pants, cleats, glove, and water.",
    content3: "Requirements to Tryout Must Be registered for Baseball, pay Athletic Fees, have a current physical.",
    documents: ["1", "2", "3", "4"],
    faqs: ["1", "2", "3", "4"],
  },
];
const summerData = [
  {
    infoType: "summer",
    date: "TBD",
    location: "Overland Baseball Field",
    time: "4:00-6 PM",
    content:
      "Summer ... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
    documents: ["1", "2", "3", "4"],
    faqs: ["1", "2", "3", "4"],
  },
];
const fallData = [
  {
    infoType: "fall",
    date: "TBD",
    location: "Overland Baseball Field",
    time: "4:00–6 PM",
    content:
      "Fall ... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
    documents: ["1", "2", "3", "4"],
    faqs: ["1", "2", "3", "4"],
  },
];
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
      setCurrentInfo(springData);
    } else if (currentSeason === "summer") {
      setCurrentInfo(summerData);
    } else {
      setCurrentInfo(fallData);
    }
  }, [currentSeason]);

  return (
    <Grid item xs={12} md={8} sx={{ minHeight: "400px", maxHeight: "500px", my: 5 }}>
      <StyledInfoBox>
        <Typography typography="h2" sx={{ color: theme.palette.primary.main, textAlign: "center" }}>
          Tryouts
        </Typography>
        <Toggles setCurrentSeason={setCurrentSeason} />
        <PlayerEvents currentInfo={currentInfo} />
        <RegistrationModal datatypeRegistration="tryouts" />
      </StyledInfoBox>
    </Grid>
  );
}
