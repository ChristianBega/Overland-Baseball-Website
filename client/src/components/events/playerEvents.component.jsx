import { Stack, Typography, Table, TableCell, TableContainer, TableRow, useTheme, TableBody } from "@mui/material";
//
import React from "react";
// import SportsBaseballIcon from "@mui/icons-material/SportsBaseball";

// Icons
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MinimizeIcon from "@mui/icons-material/Minimize";
import { Box } from "@mui/system";
export default function PlayerEvents({ currentEventData }) {
  const { date, location, time, content, contentList } = currentEventData;
  const theme = useTheme();
  return (
    <>
      <TableContainer sx={{ mb: 4, maxWidth: "100%", height: "auto" }}>
        <Table>
          <TableBody>
            <TableRow sx={{ display: "flex", justifyContent: { sm: "flex-start" } }}>
              <TableCell
                sx={{
                  width: "32%",
                  textAlign: "center",
                  padding: theme.spacing(2, 0),
                  backgroundColor: theme.palette.accent.accentThree,
                }}
              >
                <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: "center" }}>
                  <CalendarMonthIcon sx={{ mr: { xs: 0, sm: 2 }, mb: { xs: 2, sm: 0 } }} />
                  {date}
                </Box>
              </TableCell>
              <TableCell
                sx={{
                  width: "41%",
                  textAlign: "center",
                  padding: theme.spacing(2, 0),
                  backgroundColor: theme.palette.accent.accentThree,
                }}
              >
                <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: "center" }}>
                  <PlaceIcon sx={{ mr: { xs: 0, sm: 2 }, mb: { xs: 2, sm: 0 } }} />
                  {location}
                </Box>
              </TableCell>
              <TableCell
                sx={{
                  width: "32%",
                  textAlign: "center",
                  padding: theme.spacing(2, 0),
                  backgroundColor: theme.palette.accent.accentThree,
                }}
              >
                <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: "center" }}>
                  <AccessTimeIcon sx={{ mr: { xs: 0, sm: 2 }, mb: { xs: 2, sm: 0 } }} />
                  {time}
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Stack direction="column" spacing={3}>
        {content?.map((text, index) => {
          return (
            <Typography key={index} typography="p" component="p">
              {text}
            </Typography>
          );
        })}
        {contentList?.map((text, index) => {
          return (
            <Typography key={index} component="small" typography="small">
              <MinimizeIcon sx={{ fontSize: "12px" }} />
              {text}
            </Typography>
          );
        })}
      </Stack>
    </>
  );
}
