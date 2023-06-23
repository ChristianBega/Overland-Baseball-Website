import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { IconButton, TableCell, TableRow, Typography } from "@mui/material";
import React, { useState } from "react";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import VolunteerModal from "../modals/volunteerModal.component";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-child(even)": {
    backgroundColor: "#f2f2f2",
    boxShadow: 10,
    minHeight: "50px",
  },
}));

export default function EventItems({ event, isMobile }) {
  // extra data from event object : description, extraInformation
  const { eventName, location, date, time } = event;
  const [currentEventData, setCurrentEventData] = useState({ event: "", date: "", time: "" });
  const [open, setOpen] = useState();
  const theme = useTheme();
  const handleOpen = (event) => {
    let currentEvent = event.currentTarget.parentElement.parentElement.getAttribute("datatype-event");
    let currentDate = event.currentTarget.parentElement.parentElement.getAttribute("datatype-date");
    let currentTime = event.currentTarget.parentElement.parentElement.getAttribute("datatype-time");
    setCurrentEventData({ event: currentEvent, date: currentDate, time: currentTime });

    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <StyledTableRow id="table-row" datatype-event={eventName} datatype-date={date} datatype-time={time}>
      <TableCell
        sx={{
          minHeight: "100vh",
          flex: "1 0 20%",
          fontWeight: "bold",
          textAlign: "center",
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.text.primary,
          fontSize: { sm: "14px", md: "1rem" },
        }}
      >
        {date}
        <Typography component="span" sx={{ display: { xs: "block", md: "inline" }, pl: { md: 2 } }}>
          {time}
        </Typography>
      </TableCell>

      <TableCell sx={{ flex: "3 0 60%" }}>{location}</TableCell>

      {!isMobile && (
        <TableCell
          sx={{
            minHeight: { sm: "70px", md: "65px" },
            display: "flex",
            gap: ".5rem",
            alignItems: "center",
            flex: "1 0 20%",
            fontWeight: "bold",
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.text.primary,
          }}
        >
          <IconButton onClick={handleOpen} size="medium" style={{ color: theme.palette.text.primary }}>
            <AppRegistrationIcon fontSize="small" />
          </IconButton>
          <VolunteerModal open={open} handleClose={handleClose} currentEventData={currentEventData} />
          <Typography component={"span"} sx={{ fontSize: "1rem", textAlign: "center" }}>
            {eventName}
          </Typography>
        </TableCell>
      )}
    </StyledTableRow>
  );
}
