import styled from "@emotion/styled";
import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, List, ListItem, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
// import PlayerEvents from "../playerEvents/playerEvents.component";
// import RegistrationModal from "../../../../../components/modals/registrationModal.component";
import { youthProgramData } from "../../../../../websiteData/events.data";
import SectionLayout from "../../../../../components/reusableComponents/sectionLayout/sectionLayout.component";
import youthProgramImage from "../../../../../assets/eventsPage/youthProgramImage.webp";

// Icons
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import useMediaQueries from "../../../../../setup/utils/helpers/useMediaQueries.utils";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CircleIcon from "@mui/icons-material/Circle";
import { useTheme } from "@emotion/react";
// todo : turn youthProgram into a general component for playerEvents - which are player specific events displayed in a section defined in our figma.
// todo : pass in a type prop : playerEventType = workouts, tryouts, youth program....

// todo : we need to store playerEvents in the firebase database and allow the user to edit all values within the playerEvent object
// todo : data will look like the data in the youProgramData just not js objects but instead firebase collection data
const iconStyles = {
  fontSize: "1rem",
};

const bulletPointStyles = {
  fontSize: "0.75rem",
  marginTop: ".25rem",
};

const textStyles = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
};

const listItemStyles = {
  display: "flex",
  alignItems: "flex-start",
  gap: "0.25rem",
};

export default function PlayerEvent({ isMobile, playerEventType, rowReverse }) {
  const theme = useTheme();
  const [currentEventData, setCurrentEventData] = useState([]);
  const [currentSeason, setCurrentSeason] = useState("Spring");

  const handleChangeSeason = (season) => {
    setCurrentSeason(season);
  };
  useEffect(() => {
    setCurrentEventData(youthProgramData);
  }, [currentEventData]);

  return (
    <Grid item xs={12} md={8} sx={{ padding: { xs: 0, md: 8 } }}>
      <SectionLayout id="youth-program-section" aria-label="Youth Program Section">
        <Box
          component="img"
          sx={{ width: "100%", height: "200px", marginBottom: 4, borderRadius: "6px" }}
          src={youthProgramImage}
          alt="Youth Program"
        />
        {!isMobile && <Typography typography="h2">{playerEventType}</Typography>}
      </SectionLayout>

      {playerEventType !== "youth program" && (
        <Stack direction="row" spacing={2} mb={4}>
          {["Spring", "Summer", "Fall"].map((season) => (
            <Button
              key={season}
              variant={currentSeason === season ? "pillShapeActive" : "pillShapeInactive"}
              onClick={() => handleChangeSeason(season)}
              sx={{ textDecoration: "underline", color: currentSeason === season ? "#fff" : theme.palette.text.grey }}
            >
              {season}
            </Button>
          ))}
        </Stack>
      )}
      <Stack direction={"row"} justifyContent="space-between" spacing={2} mb={4}>
        <Typography component="p" sx={textStyles}>
          <CalendarMonthIcon sx={iconStyles} /> Jan, 8th
        </Typography>
        <Typography component="p" sx={textStyles}>
          <PlaceIcon sx={iconStyles} />
          Overland
        </Typography>
        <Typography component="p" sx={textStyles}>
          <AccessTimeIcon sx={iconStyles} />
          4:00-6pm
        </Typography>
      </Stack>
      <Typography component="p" gutterBottom>
        Our Youth Program is designed to instill a love for baseball in kids of all skill levels, fostering teamwork, sportsmanship, and skill
        development. From fundamental coaching to friendly matches, we provide a safe and supportive environment for young players to learn and grow
        in the sport they're passionate about.
      </Typography>
      <Typography component="p" gutterBottom>
        Campers will get the opportunity to learn baseball skills from current players and coaches of Overland Trailblazers. The day will consist of
        hitting, fielding, throwing, and catching, teaching each camper the fundamentals of the game.
      </Typography>
      <Accordion sx={{ marginTop: "1rem", marginBottom: "2rem" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
          <Typography component="span">Additional Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <ListItem sx={listItemStyles}>
              <CircleIcon sx={bulletPointStyles} />
              <Typography component="p">Eligible players: 7th & 8th grade</Typography>
            </ListItem>

            <ListItem sx={listItemStyles}>
              <CircleIcon sx={bulletPointStyles} />

              <Typography component="p">Cost: $50 per player</Typography>
            </ListItem>
            <ListItem sx={listItemStyles}>
              <CircleIcon sx={bulletPointStyles} />

              <Typography component="p">Players will receive a Blazers shirt and hat</Typography>
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
      <Button variant="contained" color="secondary">
        Register Now!
      </Button>
    </Grid>
  );
}

/* <StyledInfoBox> */
/* <PlayerEvents currentEventData={currentEventData} /> */

/* <RegistrationModal currentEventData={currentEventData} datatypeRegistration="youth program" /> */
/* </StyledInfoBox> */
