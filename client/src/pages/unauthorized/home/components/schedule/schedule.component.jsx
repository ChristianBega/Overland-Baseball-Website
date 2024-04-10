import React from "react";
import { Paper, Grid, TableContainer, Table, Typography, TableBody } from "@mui/material";
import { useTheme } from "@emotion/react";

// Schedule Data
// import { scheduleRowData } from "../../../../../websiteData/home.data";

// Components
import ScheduleItem from "../scheduleItem/scheduleItem.component";
import { useFetchCMSItemsList } from "../../../../contentManagementSystem/schedule/hooks/fetchCmsItem";

export default function Schedule() {
  const theme = useTheme();
  const { data, isLoading, error } = useFetchCMSItemsList("schedule");
  const sortByDate = (data) => data?.sort((a, b) => new Date(a.date) - new Date(b.date));
  // const sortedData = sortByDate([...data]);
  const sortedData = data ? sortByDate([...data]) : [];

  if (isLoading) {
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>Loading...</div>;
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Typography variant="h6" color="error">
          Error fetching data
        </Typography>
      </div>
    );
  }

  return (
    <Grid id="schedule" item xs={12} mt={{ xs: 5, sm: 15 }}>
      <Typography typography="h2" component="h2" sx={{ textAlign: "center", color: theme.palette.primary.main, mb: 10 }}>
        Spring 2023 Schedule
      </Typography>
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table aria-label="schedule table">
          <TableBody>
            {sortedData?.map((gameData, index) => (
              <ScheduleItem gameData={gameData} key={index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
