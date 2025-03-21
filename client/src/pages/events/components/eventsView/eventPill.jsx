import React from "react";
import { Box } from "@mui/material";
import { getEventColor } from "./utils";

/**
 * EventPill displays a single event in a calendar day cell
 *
 * @param {Object} props
 * @param {Object} props.event - Firebase event object
 * @param {Function} props.onClick - Optional click handler
 */
const EventPill = ({ event, onClick }) => {
  const colors = getEventColor(event.eventType);

  return (
    <Box
      sx={{
        padding: "0.25rem .5rem",
        borderRadius: 50,
        mb: 0.5,
        fontSize: "0.7rem",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        fontWeight: 500,
        backgroundColor: colors,
        // bgcolor: colors.bg,
        color: colors.text,
        border: `1px solid ${colors.text}`,
        cursor: onClick ? "pointer" : "default",
      }}
      onClick={onClick ? () => onClick(event) : undefined}
    >
      {event.title}
    </Box>
  );
};

export default EventPill;
