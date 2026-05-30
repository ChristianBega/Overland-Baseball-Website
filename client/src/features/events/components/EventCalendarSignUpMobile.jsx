import { IconButton, List, ListItemButton, Typography } from "@mui/material";
import React, { useContext } from "react";
import EventSignUpForm from "./EventSignUpForm";
import { CalendarContext } from "../../../features/events/context/calendar.context";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const EventList = ({ events, handleSelectMobileEvent }) => {
  return (
    <List>
      <Typography variant="h4" component="h3" mb={"1rem"}>
        Select An Event
      </Typography>
      {events.map((event) => {
        const isGameEvent = event.opponent && (event.away || !event.away); // Game events with opponents
        return (
          <ListItemButton
            sx={{
              border: "1px solid #e0e0e0",
              mb: ".5rem",
              cursor: isGameEvent ? "not-allowed" : "pointer",
            }}
            key={event.id}
            id={event.id}
            onClick={isGameEvent ? undefined : (e) => handleSelectMobileEvent(e)}
            disabled={isGameEvent}
          >
            {event.title || `Overland vs ${event.opponent}`}
          </ListItemButton>
        );
      })}
    </List>
  );
};

const CalendarSignUpMobile = ({ events, closeModal }) => {
  const { mobileCurrentSignUpStatus, mobileCurrentEventId, handleSelectMobileEvent, handleMobileSignUpGoBack } = useContext(CalendarContext);
  const selectedItem = events.find((event) => event.id === mobileCurrentEventId);

  return (
    <div>
      {mobileCurrentSignUpStatus === "selectEvent" && <EventList events={events} handleSelectMobileEvent={handleSelectMobileEvent} />}
      {mobileCurrentSignUpStatus === "signUp" && (
        <>
          <IconButton onClick={handleMobileSignUpGoBack}>
            <ArrowBackIcon />
          </IconButton>
          <EventSignUpForm data={selectedItem} closeModal={closeModal} />
        </>
      )}
    </div>
  );
};

export default CalendarSignUpMobile;
