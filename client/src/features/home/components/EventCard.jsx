import React from "react";
import useMediaQueries from "../../../utils/helpers/useMediaQueries.utils";
import TextBlock from "../../ui/components/TextBlock";
import { Button, Typography } from "@mui/material";
import { ArrowOutward } from "@mui/icons-material";
import { formatDateTimeForCalendar } from "../../../utils/helpers/formatDate";
import {
  StyledEventCard,
  StyledEventCardImageContainer,
  StyledEventCardImage,
  StyledEventCardBodyText,
  StyledEventCardHeader,
} from "./EventCard.styles";
import { EventCardCtas } from "../../ui/components/EventCtas";
import { TextTruncate } from "../../ui";

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
          <TextTruncate text={event.description} variant="body2" component="p" maxChars={isMd ? 200 : 175} sx={{ mb: 2 }} />

          {isMd && <EventCardCtas data={event} />}
        </TextBlock>
      </StyledEventCardBodyText>
    </StyledEventCard>
  );
};

export default EventCardNew;
