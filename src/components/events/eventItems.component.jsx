import { ListItem, ListItemText } from "@mui/material";
import React from "react";

export default function EventItems({ event}) {
  // extra data from event object : description, extraInformation
  const { eventName, location, date, time } = event;

  return (
    <ListItem >
      <ListItemText sx={{ flex: 2 }} primary={eventName} />
      <ListItemText sx={{ flex: 2 }} primary={location} />
      <ListItemText
        sx={{ flex: 0.5, display: "flex", alignItems: "center", justifyContent: "flex-start", columnGap: 2 }}
        primary={date}
        secondary={time}
      />
    </ListItem>
  );
}
