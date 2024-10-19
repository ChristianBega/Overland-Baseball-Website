import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import EventItems from "../eventItems/eventItems.component";
import { useTheme } from "@emotion/react";
import { useRealtimeData } from "../../../../../hooks/useRealtimeData";

export default function Events() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { data, isLoading, error } = useRealtimeData("events");

  //! update this status with our custom status component
  if (isLoading) {
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>Loading...</div>;
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Typography variant="h6" color="error">
          {error ? "Error with real-time updates" : "Error fetching/caching the data"}
        </Typography>
      </div>
    );
  }

  const filterDate = new Date("2023-01-01");
  const filteredAndSortedEvents = data.filter((event) => new Date(event.date) >= filterDate).sort((a, b) => new Date(a.date) - new Date(b.date));
  return (
    <Grid item xs={12}>
      <Typography typography="h1" component="h1" sx={{ mb: theme.spacing(8) }}>
        Upcoming Events
      </Typography>
      <TableContainer component={Paper} sx={{ color: "#000", maxHeight: 440 }}>
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
            {filteredAndSortedEvents.map((event, index) => (
              <EventItems isMobile={isMobile} key={index} data={event} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
