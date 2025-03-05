import { Button, Grid, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useState } from "react";

import SectionLayout from "../../../../components/reusableComponents/sectionLayout/sectionLayout.component";

// Icons
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import CircleIcon from "@mui/icons-material/Circle";
import { useTheme } from "@emotion/react";
import useMediaQueries from "../../../../setup/utils/helpers/useMediaQueries.utils";
// import Form from "../../../../../components/forms/form.component";
import { useModal } from "../../../../setup/context/modal.context";
import { formatTime } from "../../../../setup/utils/helpers/formatTime";
import { formatDateTimeForCalendar } from "../../../../setup/utils/helpers/formatDate";
import EventSignUpForm from "../eventSignUpForm/eventSignUpForm";

const iconStyles = {
  fontSize: "1rem",
};

// const bulletPointStyles = {
//   fontSize: "0.75rem",
//   marginTop: ".25rem",
// };

const textStyles = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  fontSize: ".9rem",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

// const listItemStyles = {
//   display: "flex",
//   alignItems: "flex-start",
//   gap: "0.25rem",
// };

const EventDetails = ({ data, currentSeason }) => {
  const theme = useTheme();
  const { isLg } = useMediaQueries();
  const { seasons, location } = data || {};

  // Get the current season's data
  const seasonData = seasons?.[currentSeason.toLowerCase()];
  const { startDateTime, endDateTime } = seasonData || {};

  const desktopStyles = {
    position: "absolute",
    bottom: "-2%",
    left: "50%",
    transform: "translateX(-44%)",
    zIndex: 1,
    color: "#fff",
    backgroundColor: `${theme.palette.primary.main}90`,
    padding: "1rem",
    borderRadius: "6px",
    width: "85%",
  };

  return (
    <Stack
      direction={"row"}
      justifyContent="space-between"
      spacing={2}
      mb={isLg ? 4 : 2}
      sx={{ maxWidth: { sm: "450px" }, ...(isLg && desktopStyles) }}
    >
      <Typography component="p" sx={textStyles}>
        <CalendarMonthIcon sx={iconStyles} />
        {startDateTime && formatDateTimeForCalendar(startDateTime)}
      </Typography>
      <Typography component="p" sx={textStyles}>
        <PlaceIcon sx={iconStyles} />
        {location}
      </Typography>
      <Typography component="p" sx={textStyles}>
        <AccessTimeIcon sx={iconStyles} />
        {startDateTime && endDateTime ? `${formatTime(startDateTime)}-${formatTime(endDateTime, true)}` : ""}
      </Typography>
    </Stack>
  );
};

const SeasonToggleButtons = ({ playerEventType, currentSeason, handleChangeSeason }) => {
  const theme = useTheme();
  const { isXs } = useMediaQueries();
  return (
    <>
      {playerEventType !== "youth program" && (
        <Stack direction="row" spacing={2} mb={4}>
          {["Spring", "Summer", "Fall"].map((season) => (
            <Button
              key={season}
              variant={currentSeason === season ? "pillShapeActive" : "pillShapeInactive"}
              onClick={() => handleChangeSeason(season)}
              sx={{ textDecoration: "underline", color: currentSeason === season ? "#fff" : theme.palette.text.grey }}
              size={isXs ? "small" : ""}
            >
              {season}
            </Button>
          ))}
        </Stack>
      )}
    </>
  );
};

export default function PlayerEvent({ playerEventType, rowReverse, data }) {
  const { title, eventImage, seasons } = data || {};
  const { openModal, closeModal } = useModal();
  const { isSm, isLg } = useMediaQueries();
  const [currentSeason, setCurrentSeason] = useState("Spring");

  // Get the current season's content
  const currentSeasonData = seasons?.[currentSeason.toLowerCase()];
  const playerEventContent = currentSeasonData?.playerEventContent;

  const paragraphs = playerEventContent
    ?.split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p);

  const handleChangeSeason = (season) => {
    setCurrentSeason(season);
  };

  const handleOpenModal = () => {
    openModal(<EventSignUpForm data={data} currentSeason={currentSeason} closeModal={closeModal} />);
  };
  console.log("data", data);
  return (
    <Grid item xs={12}>
      <SectionLayout id="player-event-section" aria-label="Player Event Section">
        <Grid container id="player-event-sub-grid" columnSpacing={isLg ? 6 : 4}>
          <Grid item xs={12} md={4} lg={5} order={{ md: rowReverse ? 1 : 2 }} sx={{ position: "relative" }}>
            <Box
              component="img"
              sx={{
                width: "100%",
                maxHeight: { xs: "275px", sm: "325px", md: "475px", lg: " 100%" },
                height: "100%",
                marginBottom: { xs: 4, md: 0 },
                borderRadius: "6px",
              }}
              src={eventImage}
              alt={title}
            />
            {!isSm && (
              <Typography typography="h2" component="h2">
                {title}
              </Typography>
            )}
            {isLg && <EventDetails data={data} currentSeason={currentSeason} />}
          </Grid>
          <Grid item xs={12} md={8} lg={7} order={{ md: rowReverse ? 2 : 1 }}>
            {isSm && (
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography typography="h2" component="h2">
                  {title}
                </Typography>
                <SeasonToggleButtons playerEventType={playerEventType} currentSeason={currentSeason} handleChangeSeason={handleChangeSeason} />
              </Stack>
            )}
            {!isSm && <SeasonToggleButtons playerEventType={playerEventType} currentSeason={currentSeason} handleChangeSeason={handleChangeSeason} />}
            {!isLg && <EventDetails data={data} currentSeason={currentSeason} />}

            {paragraphs?.map((paragraph, index) => (
              <Typography key={index} component="p" typography="p" sx={{ marginBottom: index !== paragraphs.length - 1 ? 2 : 0 }}>
                {paragraph}
              </Typography>
            ))}

            <Button onClick={handleOpenModal} variant="contained" color="secondary" sx={{ marginTop: 4 }}>
              Register Now!
            </Button>
          </Grid>
        </Grid>
      </SectionLayout>
    </Grid>
  );
}
// todo : turn youthProgram into a general component for playerEvents - which are player specific events displayed in a section defined in our figma.
// todo : pass in a type prop : playerEventType = workouts, tryouts, youth program....

// todo : we need to store playerEvents in the firebase database and allow the user to edit all values within the playerEvent object
// todo : data will look like the data in the youProgramData just not js objects but instead firebase collection data
/* <Accordion sx={{ marginTop: "1rem", marginBottom: "2rem" }}>
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
            </Accordion> */
