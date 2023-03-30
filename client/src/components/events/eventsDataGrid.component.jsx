import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import EventItems from "./eventItems.component";
import { broncoData } from "../../websiteData/events.data";
import { useTheme } from "@emotion/react";

export default function Events() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid item xs={12}>
      <Typography typography="h2" sx={{ textAlign: "center", my: 10 }}>
        Upcoming Events!
      </Typography>
      <TableContainer component={Paper} sx={{ color: "#000", my: 6, maxHeight: 440 }}>
        <Table stickyHeader aria-label="simple table">
          <TableHead sx={{ border: "2px solid red" }}>
            <TableRow>
              <TableCell
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.text.primary,
                  width: "15%",
                }}
              >
                <Typography typography="h5">Date</Typography>
              </TableCell>

              <TableCell sx={{ width: "70%", backgroundColor: theme.palette.primary.main, color: theme.palette.text.primary, textAlign: "center" }}>
                <Typography typography="h5">Location</Typography>
              </TableCell>
              {!isMobile && (
                <TableCell
                  sx={{
                    width: "15%",
                    fontWeight: "bold",
                    textAlign: "center",
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.text.primary,
                  }}
                >
                  <Typography typography="h5">Event</Typography>
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {broncoData.map((event, index) => (
              <EventItems isMobile={isMobile} key={index} event={event} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
