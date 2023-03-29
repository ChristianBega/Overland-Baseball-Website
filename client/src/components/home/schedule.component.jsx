import React from "react";
import { Paper, Grid, TableContainer, Table, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

// Schedule Data
import { scheduleRowData } from "../../websiteData/home.data";

// Components
import ScheduleItem from "./scheduleItem.component";

export default function Schedule() {
  const theme = useTheme();
  return (
    <Grid item xs={12} lg={10} mt={10}>
      <Typography typography="h2" sx={{ textAlign: "center", color: theme.palette.secondary.main, mb: 10 }}>
        Spring 2023 Schedule
      </Typography>
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table aria-label="simple table">
          {/* <TableHead sx={{ width: "100%", backgroundColor: "red" }}>
            <TableRow>
              <TableCell sx={{ width: "15%", textAlign: "center" }}>
                <Typography typography={{ xs: "bodyTextSm", md: "bodyTextLg" }}>Dates</Typography>
              </TableCell>
              <TableCell sx={{ width: "50%", textAlign: "center" }}>
                <Typography typography={{ xs: "bodyTextSm", md: "bodyTextLg" }}>Teams</Typography>
              </TableCell>
              <TableCell sx={{ width: "35%", textAlign: "right" }}>
                <Typography typography={{ xs: "bodyTextSm", md: "bodyTextLg" }}>Locations</Typography>
                </TableCell>
                </TableRow>
              </TableHead> */}
          {/* <TableBody>
            </TableBody> */}
          {scheduleRowData.map((gameData, index) => (
            <ScheduleItem gameData={gameData} key={index} />
          ))}
        </Table>
      </TableContainer>
    </Grid>
  );
}
