import styled from "@emotion/styled";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import PlayerEvents from "./playerEvents.component";

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
  flex: "1",
  flexDirection: "column",
  justifyContent: "space-between",
}));

export default function YouthProgram() {
  const [currentInfo, setCurrentInfo] = useState([]);

  useEffect(() => {
    setCurrentInfo(youthProgramData);
  }, [currentInfo]);

  return (
    <Grid item xs={12} md={6} sx={{ minHeight: "375px", maxHeight: "450px", mt: 5 }}>
      <StyledInfoBox>
        <Typography typography="h3" textAlign="center" mb={5}>
          Youth Baseball Program
        </Typography>
        {/* <Toggles setCurrentSeason={setCurrentSeason} /> */}
        <PlayerEvents currentInfo={currentInfo} />
      </StyledInfoBox>
    </Grid>
  );
}
