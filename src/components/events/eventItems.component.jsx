import { ListItem, ListItemText } from "@mui/material";
import React from "react";

export default function EventItems({ event }) {
  // extra data from event object : description, extraInformation
  const { eventName, location, date, time } = event;

  return (
    <ListItem alignItems="flex-start">
      <ListItemText sx={{ flex: 1.5 }} primary={eventName} />
      <ListItemText sx={{ flex: 1.5 }} primary={location} />
      <ListItemText
        sx={{
          flex: 0.8,
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          columnGap: 2,
          flexDirection: { xs: "column", sm: "row" },
        }}
        primary={date}
        secondary={time}
      />
    </ListItem>
  );
}
