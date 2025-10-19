import React from "react";
import EventCard from "./EventCard";
import { Divider } from "@mui/material";
import { EventSignUpForm } from "../../events";
import { useModal } from "../../ui";

const EventList = ({ events }) => {
  const { openModal, closeModal } = useModal();
  const handleSelectedCardClick = (e, id) => {
    e.stopPropagation();
    e.preventDefault();

    const item = events.find((event) => event.id === id);
    openModal(<EventSignUpForm data={item} closeModal={closeModal} />);
  };
  return (
    // TODO: Might need to be a list component (ul > li )
    <div>
      {events?.map((event, index) => (
        <>
          <EventCard key={event.id} event={event} onCardClick={handleSelectedCardClick} />
          {index !== events.length - 1 && <Divider sx={{ margin: "2rem 0" }} />}
        </>
      ))}
    </div>
    // TODO: add pagination component
  );
};

export default EventList;
