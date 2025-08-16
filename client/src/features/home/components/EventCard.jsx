import React from "react";
import useMediaQueries from "../../../utils/helpers/useMediaQueries.utils";
import ButtonBlock from "../../ui/components/ButtonBlock";
import TextBlock from "../../ui/components/TextBlock";
import { Button, Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { ArrowOutward } from "@mui/icons-material";
import addToCalendarOrOpenMaps from "../../../utils/helpers/addToCalendarOrOpenMaps";
import { formatDateTimeForCalendar } from "../../../utils/helpers/formatDate";
import {
  StyledEventCard,
  StyledEventCardImageContainer,
  StyledEventCardImage,
  StyledEventCardBodyText,
  StyledEventCardHeader,
  StyledEventCardDescription,
  StyledIconButton,
} from "./EventCard.styles";

const EventCardCtas = ({ data }) => {
  const { startDateTime, endDateTime, title, location } = data || {};
  return (
    <ButtonBlock spacing={2} direction="row">
      <StyledIconButton
        data-startDateTime={startDateTime}
        data-endDateTime={endDateTime}
        data-eventTitle={title}
        data-eventLocation={location}
        variant="minimal"
        color="secondary"
        startIcon={<CalendarMonthIcon />}
        onClick={(e) => addToCalendarOrOpenMaps(e, "date")}
      >
        {formatDateTimeForCalendar(startDateTime)}
      </StyledIconButton>
      <StyledIconButton
        data-startDateTime={startDateTime}
        data-endDateTime={endDateTime}
        data-eventTitle={title}
        data-eventLocation={location}
        variant="minimal"
        color="secondary"
        startIcon={<LocationOnIcon />}
        onClick={(e) => addToCalendarOrOpenMaps(e, "location")}
      >
        {location}
      </StyledIconButton>
    </ButtonBlock>
  );
};

const EventCardNew = ({ event, onCardClick }) => {
  const { isMd } = useMediaQueries();
  return (
    <StyledEventCard
      onClick={!isMd && ((e) => onCardClick(e, event.id))}
      role="button"
      tabIndex={0}
      aria-pressed={false}
      aria-label={`Sign Up for ${event.title} on ${formatDateTimeForCalendar(event.startDateTime)} at ${event.location}`}
    >
      <StyledEventCardImageContainer>
        <StyledEventCardImage component="img" src={event.eventImage} alt="event" />
      </StyledEventCardImageContainer>
      {!isMd && <EventCardCtas data={event} />}
      <StyledEventCardBodyText>
        <TextBlock justifyContent="space-between" gap={2}>
          <StyledEventCardHeader>
            <Typography variant="h3" component="h3">
              {event.title}
            </Typography>
            {isMd && (
              <Button
                variant="circle"
                color="secondary"
                aria-label={`Sign Up for ${event.title} on ${formatDateTimeForCalendar(event.startDateTime)} at ${event.location}`}
                onClick={(e) => onCardClick(e, event.id)}
              >
                <ArrowOutward sx={{ fontSize: "18px" }} />
              </Button>
            )}
          </StyledEventCardHeader>
          <StyledEventCardDescription variant="p" component="p">
            {event.description}
          </StyledEventCardDescription>
          {isMd && <EventCardCtas data={event} />}
        </TextBlock>
      </StyledEventCardBodyText>
    </StyledEventCard>
  );
};

export default EventCardNew;
