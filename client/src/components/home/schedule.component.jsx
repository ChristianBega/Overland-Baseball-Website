import React from "react";
import { Paper, Grid, TableContainer, Table } from "@mui/material";

// Schedule Data
import { scheduleRowData } from "../../websiteData/home.data";

// Components
import ScheduleItem from "./scheduleItem.component";

export default function schedule() {
  return (
    <Grid item xs={12} lg={10} mt={10}>
      <TableContainer component={Paper} sx={{ color: "#000" }}>
        <Table aria-label="simple table">
          {scheduleRowData.map((gameData, index) => (
            <ScheduleItem gameData={gameData} key={index} />
          ))}
        </Table>
      </TableContainer>
    </Grid>
  );
}
