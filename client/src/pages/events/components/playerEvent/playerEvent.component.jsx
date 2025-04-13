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
    // border: "1px solid white",
    bottom: "35px",
    left: "50%",
    transform: "translateX(-45.5%)",
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
      // mb={isLg ? 4 : 2}
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
  return (
    <>
      {playerEventType !== "youth program" && (
        <Stack direction="row" spacing={1} mb={{ xs: 2, md: 4 }}>
          {["Spring", "Summer", "Fall"].map((season) => (
            <Button
              key={season}
              variant={currentSeason === season ? "pillShapeActive" : "pillShapeInactive"}
              onClick={() => handleChangeSeason(season)}
              sx={{
                textDecoration: "underline",
                color: currentSeason === season ? "#fff" : theme.palette.text.grey,
                minWidth: "50px",
                fontSize: "14px",
                padding: "4px 12px",
              }}
              // size={isXs ? "small" : ""}
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

  return (
    <Grid item xs={12}>
      <SectionLayout id="player-event-section" aria-label="Player Event Section">
        <Grid
          container
          id="player-event-sub-grid"
          spacing={4}
          sx={{
            alignItems: "center",
          }}
        >
          <Grid
            item
            xs={12}
            md={4}
            lg={5}
            order={{ md: rowReverse ? 1 : 2 }}
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                minHeight: {
                  xs: "250px",
                  xs2: "300px",
                  sm: "320px",
                  tablet: "420px",
                  lg: "350px",
                },
                borderRadius: "6px",
                overflow: "hidden",
              }}
            >
              <Box
                component="img"
                src={eventImage}
                alt={title}
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "6px",
                }}
              />
            </Box>
            {isLg && (
              <Box sx={{ mt: 2 }}>
                <EventDetails data={data} currentSeason={currentSeason} />
              </Box>
            )}
          </Grid>

          <Grid
            item
            xs={12}
            md={8}
            lg={7}
            order={{ md: rowReverse ? 2 : 1 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { xs: 2, md: 1 },
            }}
          >
            <Stack direction={isSm ? "row" : "column"} spacing={2} alignItems={isSm ? "center" : "flex-start"} justifyContent="space-between">
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  mb: 0,
                  fontSize: { xs: "1.75rem", sm: "2rem", md: "2.25rem" },
                }}
              >
                {title}
              </Typography>
              <SeasonToggleButtons playerEventType={playerEventType} currentSeason={currentSeason} handleChangeSeason={handleChangeSeason} />
            </Stack>

            {!isLg && <EventDetails data={data} currentSeason={currentSeason} />}

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {paragraphs?.map((paragraph, index) => (
                <Typography
                  key={index}
                  component="p"
                  typography="p"
                  sx={{
                    marginBottom: index !== paragraphs.length - 1 ? 2 : 0,
                  }}
                >
                  {paragraph}
                </Typography>
              ))}
            </Box>

            <Button
              onClick={handleOpenModal}
              variant="contained"
              color="secondary"
              sx={{
                alignSelf: "flex-start",
                mt: { xs: 2, sm: 3 },
              }}
            >
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
