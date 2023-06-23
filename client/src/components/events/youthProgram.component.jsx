import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import PlayerEvents from "./playerEvents.component";
import RegistrationModal from "../modals/registrationModal.component";

const youthProgramData = [
  {
    // infoType: "spring",
    date: "May 20, 2023",
    location: "Overland Baseball Field",
    time: "8am–2pm ",
    content:
      "Overland Trailblazers Baseball will hold a Youth Camp May 20, 2023 campers will get the opportunity to learn baseball skills from current players and coaches of Overland Trailblazers. From hitting and fielding, to throwing and catching, each camper will learn the fundamentals of the Game. ",
    content2: "Eligible players: 7th & 8th grade",
    content3: "Cost: $50 per player",
    content4: "**Players will receive a Blazers shirt and hat **",
  },
];

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

export default function YouthProgram() {
  const theme = useTheme();
  const [currentInfo, setCurrentInfo] = useState([]);

  useEffect(() => {
    setCurrentInfo(youthProgramData);
  }, [currentInfo]);

  return (
    <Grid item xs={12} md={8} sx={{ maxHeight: "650px", my: { xs: 10, md: 15 } }}>
      <StyledInfoBox>
        <Typography typography="h2" sx={{ textAlign: "center", mb: 5, color: theme.palette.secondary.main }} textAlign="center" mb={5}>
          Youth Baseball Program
        </Typography>
        {/* <Toggles setCurrentSeason={setCurrentSeason} /> */}
        <PlayerEvents currentInfo={currentInfo} />
        <RegistrationModal datatypeRegistration="youth program" />
      </StyledInfoBox>
    </Grid>
  );
}
