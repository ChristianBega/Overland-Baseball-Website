import React, { useContext, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import EventPill from "./EventPill";
import { isToday, isPastDate } from "./EventUtils";
import { useTheme } from "@emotion/react";
import { useModal } from "../../../features/ui/context/modal.context";
import EventSignUpForm from "./EventSignUpForm";
import useMediaQueries from "../../../utils/helpers/useMediaQueries.utils";
import CalendarSignUpMobile from "./EventCalendarSignUpMobile";
import { CalendarContext } from "../../../features/events/context/calendar.context";

/**
 * Component for other month days (previous or next month)
 */
const OtherMonthDay = ({ day }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: 105,
        p: 1,
        color: "#ccc",
        bgcolor: "#f8f9fa",
        borderRadius: 0,
        border: "1px solid #f0f0f0",
        textAlign: "left",
        [theme.breakpoints.up("sm")]: {
          height: 115,
        },
        [theme.breakpoints.up("md")]: {
          height: 124,
        },
      }}
    >
      <Typography variant="body2" sx={{ fontSize: "0.75rem", color: "#ccc" }}>
        {day}
      </Typography>
    </Box>
  );
};

/**
 * Component for current month days with events
 */
const CurrentMonthDay = ({ day, month, year, events = [], onEventClick, isEventCalendarDown }) => {
  const { openModal, closeModal } = useModal();
  const { handleClearMobileSignUpValues } = useContext(CalendarContext);

  const handleViewMoreEvents = () => {
    if (events.length === 0) {
      alert("No events for this day");
      return;
    }
    openModal(<CalendarSignUpMobile events={events} closeModal={handleClearMobileSignUpValues(closeModal)} />);
  };

  const today = isToday(year, month, day);
  const pastDate = isPastDate(year, month, day);
  const theme = useTheme();

  // Styles based on day type
  const dayCellStyles = {
    height: 105,
    p: 0.5,
    position: "relative",
    bgcolor: pastDate ? "#faf9f8" : "white",
    border: today ? `2px solid #091f40a6` : "1px solid #f0f0f0",
    borderRadius: 0,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    "&:hover": {
      bgcolor: "#f8f9fa",
    },

    [theme.breakpoints.up("sm")]: {
      height: 115,
      p: 1,
    },
    [theme.breakpoints.up("md")]: {
      height: 124,
    },
  };

  const dayNumberStyles = {
    fontWeight: today ? 600 : 400,
    color: today ? theme.palette.primary.main : pastDate ? "#adb5bd" : "#212529",
    mb: 1,
    fontSize: "0.85rem",
  };

  const displayEvents = events.slice(0, 2);
  const hasHiddenEvents = events.length > 2;

  return (
    <Box sx={dayCellStyles} onClick={isEventCalendarDown ? handleViewMoreEvents : null}>
      <Typography variant="body2" sx={dayNumberStyles}>
        {day}
      </Typography>

      <Stack direction="column" spacing={1} sx={{ overflow: "hidden", overflowY: "hidden", minHeight: { md: 55 } }}>
        {displayEvents.map((event) => (
          <EventPill key={event.id} event={event} onClick={isEventCalendarDown ? null : onEventClick} />
        ))}
      </Stack>

      {hasHiddenEvents && (
        <Typography
          onClick={isEventCalendarDown ? null : handleViewMoreEvents}
          variant="caption"
          sx={{
            color: "#6c757d",
            fontSize: { xs: "9px", sm: "10px", md: "12px" },
            mt: 0.5,
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          +{events.length - 2} more
        </Typography>
      )}
    </Box>
  );
};

/**
 * CalendarDay component chooses between current month or other month day
 *
 * @param {Object} props
 * @param {number} props.day - Day number
 * @param {number} props.month - Month (0-11)
 * @param {number} props.year - Year
 * @param {boolean} props.isCurrentMonth - Whether this day is in the current display month
 * @param {Array} props.events - Array of events for this day
 * @param {Function} props.onEventClick - Function to call when an event is clicked
 */
const CalendarDay = ({ day, month, year, isCurrentMonth, events = [], onEventClick }) => {
  const { isEventCalendarDown } = useMediaQueries();
  if (!isCurrentMonth) {
    return <OtherMonthDay day={day} onEventClick={onEventClick} isEventCalendarDown={isEventCalendarDown} />;
  }

  return (
    <CurrentMonthDay day={day} month={month} year={year} events={events} onEventClick={onEventClick} isEventCalendarDown={isEventCalendarDown} />
  );
};

export default CalendarDay;
