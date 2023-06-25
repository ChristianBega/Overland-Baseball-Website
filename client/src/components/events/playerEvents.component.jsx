import { Stack, Typography, Table, TableCell, TableContainer, TableRow, useTheme, TableBody } from "@mui/material";
//
import React from "react";
// import SportsBaseballIcon from "@mui/icons-material/SportsBaseball";

// Icons
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Box } from "@mui/system";
export default function PlayerEvents({ currentInfo }) {
  const theme = useTheme();
  return (
    <>
      {currentInfo.map((info, index) => (
        <div key={index}>
          <TableContainer sx={{ mb: 3, maxWidth: "90%", height: "auto", margin: "auto" }}>
            <Table>
              <TableBody>
                <TableRow sx={{ display: "flex", justifyContent: { sm: "flex-start" } }}>
                  <TableCell
                    sx={{
                      width: "32%",
                      textAlign: "center",
                      p: 2,
                      backgroundColor: theme.palette.accent.accentThree,
                    }}
                  >
                    <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: "center", justifyContent: "center" }}>
                      <CalendarMonthIcon sx={{ mr: { xs: 0, sm: 2 }, mb: { xs: 2, sm: 0 } }} />
                      {info.date}
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{
                      width: "41%",
                      textAlign: "center",
                      p: 2,
                      backgroundColor: theme.palette.accent.accentThree,
                    }}
                  >
                    <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: "center", justifyContent: "center" }}>
                      <PlaceIcon sx={{ mr: { xs: 0, sm: 2 }, mb: { xs: 2, sm: 0 } }} />
                      {info.location}
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{
                      width: "32%",
                      textAlign: "center",
                      p: 2,

                      backgroundColor: theme.palette.accent.accentThree,
                    }}
                  >
                    <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: "center", justifyContent: "center" }}>
                      <AccessTimeIcon sx={{ mr: { xs: 0, sm: 2 }, mb: { xs: 2, sm: 0 } }} />
                      {info.time}
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Stack direction="column" spacing={3} sx={{ minHeight: "150px", p: 5, textAlign: "center" }}>
            <Typography typography="bodyTextSm">{info.content}</Typography>
            <Typography typography="bodyTextSm">{info.content2}</Typography>
            <Typography typography="bodyTextSm">{info.content3}</Typography>
            {info.content4 ? <Typography component="small">{info.content4}</Typography> : null}
          </Stack>
        </div>
      ))}
    </>
  );
}
