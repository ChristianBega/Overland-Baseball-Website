import React, { useState } from "react";
import { Paper } from "@mui/material";
import CalendarHeader from "./calendarHeader";
import CalendarGrid from "./calendarGrid";
import EventSignUpForm from "../eventSignUpForm/eventSignUpForm";
import { useModal } from "../../../../features/ui";

/**
 * Main Calendar component designed to work directly with Firebase events
 *
 * @param {Object} props
 * @param {Array} props.events - Array of Firebase event objects
 * @param {Function} props.onEventClick - Optional handler for event clicks
 */

const Calendar = ({ events = [], onEventClick }) => {
  // State for tracking currently displayed month/year
  const [currentDate, setCurrentDate] = useState(new Date());
  const { openModal, closeModal } = useModal();
  // Handler for navigating to previous month
  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  // Handler for navigating to next month
  const handleNextMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  // Handler for navigating to today
  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const defaultEventClickHandler = (event) => {
    openModal(<EventSignUpForm data={event} closeModal={closeModal} />);
  };

  // Use provided event click handler or default
  const eventClickHandler = defaultEventClickHandler;

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "8px",
        bgcolor: "white",
        mx: "auto",
        overflow: "hidden",
      }}
    >
      {/* Calendar grid with days */}
      <CalendarGrid
        currentDate={currentDate}
        events={events}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onToday={handleToday}
        onEventClick={eventClickHandler}
      />
    </Paper>
  );
};

export default Calendar;
