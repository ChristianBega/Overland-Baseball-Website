import { useTheme } from "@emotion/react";
import { TableCell, TableRow, Typography } from "@mui/material";
import React from "react";

export default function EventItems({ event }) {
  // extra data from event object : description, extraInformation
  const { eventName, location, date, time } = event;
  const theme = useTheme();

  return (
    <TableRow>
      <TableCell
        sx={{ textAlign: "center", fontWeight: "bold", backgroundColor: theme.palette.primary.main, color: theme.palette.text.primary, width: "15%" }}
      >
        {eventName}
      </TableCell>
      <TableCell sx={{ width: "70%" }}>{location}</TableCell>
      <TableCell
        sx={{
          width: "15%",
          fontWeight: "bold",
          textAlign: "center",
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.text.primary,
        }}
      >
        {date}
        <Typography component="span" sx={{ display: "block" }}>
          {time}
        </Typography>
      </TableCell>
    </TableRow>
  );
}
