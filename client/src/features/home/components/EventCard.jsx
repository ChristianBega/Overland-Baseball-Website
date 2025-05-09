import React from "react";
// MUI
import { Box, Button, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
// Styled Components
import { StyledDescriptionText } from "./EventCard.styles";
// Icons
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
// Helpers & Utils
import { formatDateTimeForCalendar } from "../../../utils/helpers/formatDate";
import useMediaQueries from "../../../utils/helpers/useMediaQueries.utils";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import addToCalendarOrOpenMaps from "../../../utils/helpers/addToCalendarOrOpenMaps";
// ! move this logic into a handleNavigatingToCalendarOrMap func

const EventCardCtas = ({ data }) => {
  const { startDateTime, endDateTime, title, location } = data || {};
  const { isMd } = useMediaQueries();
  const buttons = [
    {
      type: "date",
      icon: <CalendarMonthIcon />,
      value: startDateTime,
      eventValue: { startDateTime, endDateTime },
      // display: startDateTime,
      display: formatDateTimeForCalendar(startDateTime),
    },
    {
      type: "location",
      icon: <LocationOnIcon />,
      value: location,
      // value: location?.locationAddress,
      eventValue: { location: location?.locationAddress },
      display: location,
      // display: location?.locationAddress,
    },
  ];

  return (
    <Stack direction={"row"} spacing={2} sx={{ justifyContent: isMd ? "flex-start" : "flex-end", display: isMd && "inline", zIndex: 100 }}>
      {buttons.map((button) => (
        <Button
          variant="contained"
          key={button.type}
          data-startDateTime={startDateTime}
          data-endDateTime={endDateTime}
          data-eventTitle={title}
          data-eventLocation={location}
          onClick={(e) => addToCalendarOrOpenMaps(e, button.type)}
          color="secondary"
          size="card"
          startIcon={button.icon}
          aria-label={`${button.type === "date" ? "Add to calendar" : "View location"}: ${button.display}`}
        >
          {button.display}
        </Button>
      ))}
    </Stack>
  );
};
const EventCard = ({ card, index, selectedCardIndex, setSelectedCardIndex, handleSelectedCardClick }) => {
  const { isMd, isLg } = useMediaQueries();

  const handleDesktopCardClick = (isSelected, isMd) => {
    setSelectedCardIndex(index);
    if (handleSelectedCardClick && isSelected && isMd) {
      handleSelectedCardClick(index);
    }
  };

  const handleMobileCardClick = () => {
    setSelectedCardIndex(index);
    if (handleSelectedCardClick) {
      handleSelectedCardClick(index);
    }
  };

  return (
    <Grid
      item
      xs={12}
      md={selectedCardIndex === index && 6}
      sx={{
        display: { md: selectedCardIndex !== index && "flex" },
        "&:hover": { cursor: "pointer", transform: "scale(1.01)" },
        transition: "all .3s ease-in-out",
        position: "relative",
      }}
      onClick={() => handleDesktopCardClick(selectedCardIndex === index, isMd)}
      role="button"
      tabIndex={0}
      aria-pressed={selectedCardIndex === index}
    >
      <Card
        key={index}
        variant={selectedCardIndex === index ? "events-main" : "events-secondary"}
        sx={{ backgroundImage: `url(${card?.eventImage})`, position: "relative", zIndex: 1 }}
      >
        {!isMd && <EventCardCtas data={card} />}
        {!isMd && (
          <CardContent sx={{ color: "#fff", zIndex: 1 }}>
            <Typography variant="h3" component="h3" gutterBottom={selectedCardIndex === index}>
              {card.title}
            </Typography>
            {selectedCardIndex === index && (
              <StyledDescriptionText cardType="main" variant="body2" component="p">
                {card.description}
              </StyledDescriptionText>
            )}
            {selectedCardIndex === index && (
              <Box sx={{ mt: 2 }}>
                <Button onClick={handleMobileCardClick} variant="contained" color="secondary" size="card" startIcon={<AppRegistrationIcon />}>
                  Sign Up
                </Button>
              </Box>
            )}
          </CardContent>
        )}
      </Card>
      {isMd && (
        <Box
          sx={{
            zIndex: 1,
            color: "#000",
            mt: selectedCardIndex === index ? "2rem" : "0",
            ml: selectedCardIndex !== index ? "1rem" : "0",
            display: "block",
          }}
        >
          <Stack direction={isLg ? "row" : "column"} justifyContent="space-between" mb={2}>
            {selectedCardIndex === index && !isLg && <EventCardCtas data={card} />}
            <Typography variant="h4" component="h3" sx={{ display: "inline", mt: { md: 1, lg: 0 } }}>
              {card.title}
            </Typography>
            {selectedCardIndex === index && isLg && <EventCardCtas data={card} />}
          </Stack>

          {selectedCardIndex === index ? (
            <Stack spacing={2} sx={{ display: "block" }}>
              <Typography cardType="main" variant="body2" component="p" color="#000">
                {card.description}
              </Typography>
            </Stack>
          ) : (
            <StyledDescriptionText cardType="main" variant="body2" component="p" color="#000">
              {card.description}
            </StyledDescriptionText>
          )}
        </Box>
      )}
    </Grid>
  );
};

export default EventCard;
