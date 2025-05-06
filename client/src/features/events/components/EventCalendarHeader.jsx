import React from "react";
import { Box, Typography, IconButton, Button } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

/**
 * CalendarHeader component with month display and navigation
 *
 * @param {Object} props
 * @param {Date} props.currentDate - Current displayed date
 * @param {Function} props.onPrevMonth - Handler for previous month button
 * @param {Function} props.onNextMonth - Handler for next month button
 * @param {Function} props.onToday - Handler for today button
 */
const CalendarHeader = ({ currentDate, onPrevMonth, onNextMonth, onToday }) => {
  const monthYearText = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
        // mb: 2,
        // border: "2px solid #f0f0f0",
        // boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h5" component="h3" sx={{ mb: 0 }}>
          {monthYearText}
        </Typography>

        <IconButton onClick={onPrevMonth}>
          <ChevronLeft />
        </IconButton>

        <IconButton onClick={onNextMonth}>
          <ChevronRight />
        </IconButton>
      </Box>

      <Button variant="contained" size="small" color="secondary" onClick={onToday}>
        Today
      </Button>
    </Box>
  );
};

export default CalendarHeader;
