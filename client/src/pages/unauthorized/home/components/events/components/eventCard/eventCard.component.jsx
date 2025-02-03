import React from "react";
// MUI
import { Box, Button, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
// Styled Components
import { StyledDescriptionText } from "./eventCard.styles";
// Icons
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RightArrowIcon from "@mui/icons-material/ArrowForwardIos";
// Helpers & Utils
import { formatDateTimeForCalendar } from "../../../../../../../setup/utils/helpers/formatDate";
import useMediaQueries from "../../../../../../../setup/utils/helpers/useMediaQueries.utils";

// ! move this logic into a handleNavigatingToCalendarOrMap func
const handleEventButtonClick = (event) => {
  const eventValue = event.currentTarget.getAttribute("data-eventValue");
  const eventTitle = event.currentTarget.getAttribute("data-eventTitle");
  const startDateTime = event.currentTarget.getAttribute("data-startDateTime");
  const endDateTime = event.currentTarget.getAttribute("data-endDateTime");
  const eventLocation = event.currentTarget.getAttribute("data-eventLocation");
  const eventValueObject = JSON.parse(eventValue);
  if (eventValueObject.startDateTime && eventValueObject.endDateTime) {
    const calendarUrl = `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(
      eventTitle
    )}&dates=${startDateTime}/${endDateTime}&details=${encodeURIComponent(eventTitle)}&location=${encodeURIComponent(eventLocation)}`;
    window.open(calendarUrl, "_blank");
  } else if (eventValueObject.location) {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(eventLocation)}`;
    window.open(mapsUrl, "_blank");
  }
};

const EventCardCtas = ({ card }) => {
  const { isMd } = useMediaQueries();
  return (
    <Stack direction="row" spacing={2} sx={{ justifyContent: isMd ? "flex-start" : "flex-end", display: isMd && "inline", zIndex: 1 }}>
      {card.cta.map((cta, index) => (
        <React.Fragment key={index}>
          {Object.entries(cta).map(([key, value]) => {
            return (
              <Button
                data-startDateTime={card.startDateTime}
                data-endDateTime={card.endDateTime}
                data-eventTitle={card.title}
                data-eventDate={card.date}
                data-eventLocation={card.location.locationAddress}
                data-eventValue={JSON.stringify(value)}
                onClick={handleEventButtonClick}
                key={key}
                variant="contained"
                color="secondary"
                size="card"
                startIcon={key === "date" ? <CalendarMonthIcon /> : <LocationOnIcon />}
              >
                {key === "date" ? formatDateTimeForCalendar(value.startDateTime) : value.location}
              </Button>
            );
          })}
        </React.Fragment>
      ))}
    </Stack>
  );
};
const EventCard = ({ card, index, selectedCardIndex, setSelectedCardIndex }) => {
  const { isMd, isLg } = useMediaQueries();
  const handleCardClick = () => {
    setSelectedCardIndex(index);
  };

  return (
    <Grid
      item
      xs={12}
      md={selectedCardIndex === index && 6}
      sx={{
        display: { md: selectedCardIndex !== index && "flex" },
        "&:hover": { cursor: "pointer", transform: selectedCardIndex == index ? "scale(1.01)" : "scale(1)" },
        transition: "all .3s ease-in-out",
      }}
    >
      <Card
        key={index}
        variant={selectedCardIndex === index ? "events-main" : "events-secondary"}
        sx={{ backgroundImage: `url(${card?.image})` }}
        onClick={handleCardClick}
      >
        {!isMd && <EventCardCtas card={card} />}
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
          </CardContent>
        )}
      </Card>
      {isMd && (
        <Box sx={{ zIndex: 1, color: "#000", mt: selectedCardIndex === index ? "2rem" : "0", ml: selectedCardIndex !== index ? "1rem" : "0" }}>
          <Stack direction={isLg ? "row" : "column"} justifyContent="space-between" mb={2}>
            {selectedCardIndex === index && !isLg && <EventCardCtas card={card} />}
            <Typography variant="h4" component="h3" sx={{ display: "inline", mt: { md: 1, lg: 0 } }}>
              {card.title}
            </Typography>
            {selectedCardIndex === index && isLg && <EventCardCtas card={card} />}
          </Stack>

          {selectedCardIndex === index ? (
            <Stack spacing={2} sx={{ display: "block" }}>
              <Typography cardType="main" variant="body2" component="p" color="#000">
                {card.description}
              </Typography>
              <Button variant="contained" color="secondary" size="medium" endIcon={<RightArrowIcon />}>
                Sign Up Now!
              </Button>
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
