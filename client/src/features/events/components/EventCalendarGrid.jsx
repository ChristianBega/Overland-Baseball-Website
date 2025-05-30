import React from "react";
import { Grid, Box } from "@mui/material";
import CalendarDay from "./EventCalendarDay";
import { getDaysInMonth, getFirstDayOfMonth, getWeekDayNames, formatDateForComparison, filterEventsForDate } from "./EventUtils";
import { useTheme } from "@emotion/react";
import CalendarHeader from "./EventCalendarHeader";

/**
 * CalendarGrid component that displays a month of days
 *
 * @param {Object} props
 * @param {Date} props.currentDate - Current displayed date
 * @param {Array} props.events - Array of Firebase events
 * @param {Function} props.onEventClick - Function to call when an event is clicked
 */
const CalendarGrid = ({ currentDate, events = [], onEventClick, onPrevMonth, onNextMonth, onToday }) => {
  const theme = useTheme();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Calculate calendar grid properties
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);
  const dayNames = getWeekDayNames();

  // Calculate previous month details for filling in the grid
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevMonthYear = month === 0 ? year - 1 : year;
  const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth);

  // Calculate days needed from next month
  const totalDaysDisplayed = firstDayOfMonth + daysInMonth;
  const nextMonthDays = 7 * Math.ceil(totalDaysDisplayed / 7) - totalDaysDisplayed;

  // Render day name headers
  const renderDayHeaders = () => {
    return dayNames.map((day) => (
      <Grid item xs={12 / 7} key={`header-${day}`}>
        <Box
          sx={{
            textAlign: "center",
            py: 2,
            color: theme.palette.primary.main,
            backgroundColor: "#fff",
            // backgroundColor: theme.palette.primary.main,
            border: "1px solid #f0f0f0ba",
            fontSize: "0.75rem",
            fontWeight: 500,
          }}
        >
          {day}
        </Box>
      </Grid>
    ));
  };

  // Render previous month days
  const renderPrevMonthDays = () => {
    const prevDays = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      const day = daysInPrevMonth - firstDayOfMonth + i + 1;

      prevDays.push(
        <Grid item xs={12 / 7} key={`prev-${i}`}>
          <CalendarDay day={day} month={prevMonth} year={prevMonthYear} isCurrentMonth={false} onEventClick={onEventClick} />
        </Grid>
      );
    }

    return prevDays;
  };

  // Render current month days
  const renderCurrentMonthDays = () => {
    const currentDays = [];

    for (let day = 1; day <= daysInMonth; day++) {
      // Format date string to match event date format (YYYY-MM-DD)
      const date = new Date(year, month, day);
      const dateString = formatDateForComparison(date);

      // Get events for this day
      const dayEvents = filterEventsForDate(events, dateString);

      currentDays.push(
        <Grid item xs={12 / 7} key={`current-${day}`}>
          <CalendarDay day={day} month={month} year={year} isCurrentMonth={true} events={dayEvents} onEventClick={onEventClick} />
        </Grid>
      );
    }

    return currentDays;
  };

  // Render next month days
  const renderNextMonthDays = () => {
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextMonthYear = month === 11 ? year + 1 : year;
    const nextDays = [];

    for (let i = 1; i <= nextMonthDays; i++) {
      nextDays.push(
        <Grid item xs={12 / 7} key={`next-${i}`}>
          <CalendarDay day={i} month={nextMonth} year={nextMonthYear} isCurrentMonth={false} onEventClick={onEventClick} />
        </Grid>
      );
    }

    return nextDays;
  };

  return (
    <Grid
      container
      sx={{
        overflow: "hidden",
        border: "1px solid #f0f0f0",
        borderRadius: "4px",
      }}
    >
      <Grid item xs={12}>
        <CalendarHeader currentDate={currentDate} onPrevMonth={onPrevMonth} onNextMonth={onNextMonth} onToday={onToday} />
      </Grid>

      {/* Day headers (Sun, Mon, etc) */}
      {renderDayHeaders()}

      {/* Previous month days */}
      {renderPrevMonthDays()}

      {/* Current month days */}
      {renderCurrentMonthDays()}

      {/* Next month days */}
      {renderNextMonthDays()}
    </Grid>
  );
};

export default CalendarGrid;
