import React from "react";
import { Box, Typography } from "@mui/material";
import { getEventColor } from "./EventUtils";
/**
 * EventPill displays a single event in a calendar day cell
 *
 * @param {Object} props
 * @param {Object} props.event - Firebase event object
 * @param {Function} props.onClick - Optional click handler
 */
const EventPill = ({ event, onClick }) => {
  const colors = getEventColor(event?.gameType?.toLowerCase());
  const isGameEvent = event.opponent && (event.away || !event.away); // if there is an opponent and either away or home, it is a game event
  return (
    <Box
      sx={{
        borderRadius: "50px",
        bgcolor: colors,
        border: `1px solid ${colors}`,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        cursor: onClick && isGameEvent ? "pointer" : "default",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.25)",
      }}
      onClick={onClick && !isGameEvent ? () => onClick(event) : undefined}
    >
      <Typography
        variant="body2"
        component="h3"
        sx={{
          fontSize: { xs: "10px", sm: "10px", md: "12px" },
          color: colors.text,
          padding: { sm: ".15rem .25rem", md: ".15rem .5rem" },
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
          maxWidth: "100%",
        }}
      >
        {event.title || `Overland vs ${event.opponent}`}
      </Typography>
    </Box>
  );
};

export default EventPill;
