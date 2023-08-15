import React from "react";
import { Paper, Grid, TableContainer, Table, Typography, TableBody } from "@mui/material";
import { useTheme } from "@emotion/react";

// Schedule Data
import { scheduleRowData } from "../../websiteData/home.data";

// Components
import ScheduleItem from "./scheduleItem.component";

export default function Schedule() {
  const theme = useTheme();
  return (
    <Grid id="schedule" item xs={12} mt={{ xs: 5, sm: 15 }}>
      <Typography typography="h2" component="h2" sx={{ textAlign: "center", color: theme.palette.primary.main, mb: 10 }}>
        Spring 2023 Schedule
      </Typography>
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table aria-label="schedule table">
          <TableBody>
            {scheduleRowData.map((gameData, index) => (
              <ScheduleItem gameData={gameData} key={index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
