import React from "react";
// MUI
import { Button, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
// Styled Components
import { StyledDescriptionText } from "./eventCard.styles";
// Icons
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
// Helpers & Utils
import { formatDateTimeForCalendar } from "../../../../../../../setup/utils/helpers/formatDate";

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

const EventCard = ({ card, index, selectedCardIndex, setSelectedCardIndex }) => {
  const handleCardClick = () => {
    setSelectedCardIndex(index);
  };

  return (
    <>
      <Grid item xs={12} md={selectedCardIndex === index && 6}>
        <Card
          key={index}
          variant={selectedCardIndex === index ? "events-main" : "events-secondary"}
          sx={{ backgroundImage: `url(${card?.image})` }}
          onClick={handleCardClick}
        >
          <Stack direction="row" spacing={2} sx={{ justifyContent: "flex-end", zIndex: 1 }}>
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
        </Card>
      </Grid>
    </>
  );
};

export default EventCard;
