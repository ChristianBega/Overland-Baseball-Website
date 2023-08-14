import { useTheme } from "@emotion/react";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import EventItems from "./eventItems.component";
import CloseIcon from "@mui/icons-material/Close";

export default function FundraisersDataGrid({ events, currentEvent, handleClose }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  console.log(currentEvent);

  return (
    <>
      <IconButton onClick={handleClose} size="medium" sx={{ justifyContent: "center", color: "theme.palette.primary.main", width: "10%" }}>
        <CloseIcon />
      </IconButton>
      <Typography variant="h3" component="h2" sx={{ textAlign: "center", my: 10, color: theme.palette.secondary.main }}>
        {currentEvent} Events
      </Typography>
      <TableContainer component={Paper} sx={{ color: "#000", my: 6, maxHeight: 440 }}>
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.text.primary,
                  width: "20%",
                }}
              >
                <Typography typography="h6">Date</Typography>
              </TableCell>

              <TableCell sx={{ width: "60%", backgroundColor: theme.palette.primary.main, color: theme.palette.text.primary, textAlign: "center" }}>
                <Typography component={"span"} typography="h6">
                  Location
                </Typography>
              </TableCell>
              {!isMobile && (
                <TableCell
                  sx={{
                    width: "20%",
                    fontWeight: "bold",
                    textAlign: "center",
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.text.primary,
                    overflow: " hidden",
                  }}
                >
                  <Typography component={"span"} typography="h6">
                    Event
                  </Typography>
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event, index) => (
              <EventItems isMobile={isMobile} key={index} event={event} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
