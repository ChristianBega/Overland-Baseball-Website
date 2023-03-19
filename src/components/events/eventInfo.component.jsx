import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import TextComponent from "../reusableComponents/textComponent.component";
import Toggles from "./toggles.component";

const springEventData = [
  {
    id: "spring",
    content: "spring Event information about the upcoming event, links, forms, etc...",
  },
];
const fallEventData = [
  {
    id: "summer",
    content: "Event information about the upcoming event, links, forms, etc...",
  },
];
const summerEventData = [
  {
    id: "summer",
    content: "Event information about the upcoming event, links, forms, etc...",
  },
];
// { setCurrentSeason, currentSeason }
export default function EventInfo() {
  const [currentSeason, setCurrentSeason] = useState("spring");
  const [currentEventData, setCurrentEventData] = useState([]);

  useEffect(() => {
    if (currentSeason === "spring") {
      setCurrentEventData(springEventData);
    } else if (currentSeason === "summer") {
      setCurrentEventData(summerEventData);
    } else {
      setCurrentEventData(fallEventData);
    }
  }, [currentSeason]);

  return (
    <Grid item xs={12} md={6}>
      <Box sx={{ minHeight: "200px", display: "flex", flexDirection: "column" }}>
        <Typography typography="h4">{currentSeason}</Typography>
        <TextComponent location="events" eventsData={currentEventData} />
        <Toggles setCurrentSeason={setCurrentSeason} />
      </Box>
    </Grid>
  );
}
