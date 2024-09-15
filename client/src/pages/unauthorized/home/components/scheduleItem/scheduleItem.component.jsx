import React from "react";
import { TableRow, TableCell, Typography, Stack, Box, styled } from "@mui/material";
import { useTheme } from "@mui/material";

// Assets
import overland from "../../../../../assets/homePage/teamLogos/overland.webp";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: "#f2f2f2",
    boxShadow: 10,
  },
}));

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0]; // Returns 'YYYY-MM-DD'
};

// Helper function to format the time to HH:MM
const convertTo24HourFormat = (timeString) => {
  const [time, modifier] = timeString.split(" "); // Split the time and AM/PM part
  let [hours, minutes] = time.split(":"); // Split hours and minutes

  // Convert hours from string to integer for calculation
  hours = parseInt(hours, 10);

  if (modifier === "PM" && hours !== 12) {
    hours += 12; // Convert PM hours, except for 12 PM
  } else if (modifier === "AM" && hours === 12) {
    hours = 0; // Convert 12 AM to 00
  }

  // Convert hours back to a string and pad with leading zero if necessary
  return `${String(hours).padStart(2, "0")}:${minutes}`; // Return in HH:MM format
};

export default function ScheduleItem({ data, isEditable, editableData, handleChange }) {
  const theme = useTheme();
  // time - key on gameData object
  const { date, time, location, opponent, opponentLogo } = data || editableData;

  return (
    <StyledTableRow>
      <TableCell
        className="table-cell"
        sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.text.primary, flex: "1 0 10%", textAlign: "center" }}
      >
        {isEditable ? (
          <input onChange={handleChange("date")} type="date" value={formatDate(date)}></input>
        ) : (
          <Typography component="p">{date}</Typography>
        )}
        {isEditable ? (
          <input onChange={handleChange("time")} type="time" value={convertTo24HourFormat(time)}></input>
        ) : (
          <Typography component="p">{time}</Typography>
        )}
      </TableCell>
      <TableCell sx={{ flex: "2 0 25%" }}>
        <Box component="img" src={overland} sx={{ maxWidth: "65px", display: "flex", margin: "auto" }}></Box>
      </TableCell>
      <TableCell sx={{ flex: "0 0 10%", fontFamily: "'Lilita One', cursive", fontSize: { xs: 18, md: 22, textAlign: "center" } }}>
        {location !== "Overland High" ? "@" : "Vs"}
      </TableCell>
      <TableCell sx={{ flex: "2 0 25%" }}>
        <Box component="img" src={opponentLogo} sx={{ maxWidth: "55px", display: "flex", margin: "auto", borderRadius: "50%" }}></Box>
      </TableCell>
      <TableCell
        sx={{
          flex: "3 0 30%",
          textAlign: "center",
          [theme.breakpoints.only("xs")]: {
            display: "none",
          },
        }}
      >
        <Stack>
          {/* <Typography component="span">Opponent: {opponent}</Typography>
          <Typography component="span">Location: {location}</Typography> */}
          {isEditable ? (
            <input onChange={handleChange("opponent")} type="text" value={opponent}></input>
          ) : (
            <Typography component="span">Opponent: {opponent}</Typography>
          )}
          {isEditable ? (
            <input onChange={handleChange("location")} type="text" value={location}></input>
          ) : (
            <Typography component="span">Location: {location}</Typography>
          )}
        </Stack>
      </TableCell>
    </StyledTableRow>
  );
}
