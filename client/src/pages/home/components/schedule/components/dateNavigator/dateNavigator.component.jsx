import React, { useRef } from "react";
import { IconButton, Stack, Typography } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useDateNavigator } from "./dateNavigator.context";

const days = ["sun", "mon", "tues", "wed", "thurs", "fri", "sat"];

const DateNavigator = ({ events }) => {
  const { currentWeek, handlePrevWeek, handleNextWeek } = useDateNavigator();
  const eventRefs = useRef([]);

  const getWeekDates = (startOfWeek) => {
    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      return day;
    });
  };

  const isEventDay = (date) => {
    return events.some((event) => {
      return new Date(event.date).toDateString() === date.toDateString();
    });
  };

  const weekDates = getWeekDates(currentWeek);

  return (
    <div>
      <Typography variant="h3" style={{ color: "red", textAlign: "center", marginBottom: "1rem" }}>
        {currentWeek.toDateString()}
      </Typography>
      <Stack direction="row" spacing={3} alignItems="center" mb={4}>
        <IconButton size="small" color="secondary" onClick={handlePrevWeek}>
          <ChevronLeft />
        </IconButton>
        {weekDates.map((date, index) => (
          <Stack key={index} direction="column" alignItems="center" ref={(el) => (eventRefs.current[index] = el)}>
            <Typography component="p" variant="body2" mb={0}>
              {days[index].slice(0, 1).toUpperCase()}
            </Typography>
            <Typography
              variant="body2"
              component="span"
              style={{
                color: isEventDay(date) ? "green" : "inherit",
                position: "relative",
              }}
            >
              {date.getDate()}
              {isEventDay(date) && (
                <span
                  style={{
                    position: "absolute",
                    bottom: -2,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    backgroundColor: "green",
                  }}
                />
              )}
            </Typography>
          </Stack>
        ))}
        <IconButton size="small" color="secondary" onClick={handleNextWeek}>
          <ChevronRight />
        </IconButton>
      </Stack>
    </div>
  );
};

export default DateNavigator;
