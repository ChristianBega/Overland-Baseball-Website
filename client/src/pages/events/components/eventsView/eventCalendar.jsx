import React, { useState } from "react";
import { Paper } from "@mui/material";
import CalendarHeader from "./calendarHeader";
import CalendarGrid from "./calendarGrid";

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

  // The default event click handler logs the event
  const defaultEventClickHandler = (event) => {
    console.log("Event clicked:", event);
  };

  // Use provided event click handler or default
  const eventClickHandler = onEventClick || defaultEventClickHandler;

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
      {/* Calendar header with navigation */}
      <CalendarHeader currentDate={currentDate} onPrevMonth={handlePrevMonth} onNextMonth={handleNextMonth} onToday={handleToday} />

      {/* Calendar grid with days */}
      <CalendarGrid currentDate={currentDate} events={events} onEventClick={eventClickHandler} />
    </Paper>
  );
};

export default Calendar;
