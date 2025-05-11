import { useTheme } from "@emotion/react";
import React, { useMemo } from "react";
// MUI
import { Grid, Typography, Box, Stack } from "@mui/material";
// Components
import SectionLayout from "../../ui/components/SectionLayout";
import ScheduleItem from "../components/ScheduleItem";
// import DateNavigator from "./components/dateNavigator/dateNavigator.component";
// Hooks
import { useRealtimeData } from "../../../hooks/useRealtimeData";
// Icons
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function Schedule() {
  const theme = useTheme();
  const { data, isLoading, error } = useRealtimeData("schedule");
  // ! - if the date is in the past, we want to not show it??
  // ! - but, if the user is using the dateNavigator, and they are on a past date, we want to show it??

  // 1. if date is in the past, append to end of data array and style as "grayed out"
  // 2. if the date is not in the past, and is current or future, organize by date chronologically
  // const sortByDate = (data) => data?.sort((a, b) => new Date(a.date) - new Date(b.date));
  // const sortedData = data ? sortByDate([...data]) : [];

  const sortedData = useMemo(() => {
    if (!data) return [];

    const now = new Date();

    // Create a new array with the isPast property added to each item
    const dataWithPastFlag = data.map((item) => {
      const itemDate = new Date(item.date);
      return {
        ...item,
        isPast: itemDate < now,
      };
    });

    // Separate past and future events
    const pastEvents = dataWithPastFlag.filter((item) => item.isPast);
    const futureEvents = dataWithPastFlag.filter((item) => !item.isPast);

    // Sort each group chronologically
    pastEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
    futureEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Combine with future events first, then past events
    return [...futureEvents, ...pastEvents];
  }, [data]);
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

  return (
    <Grid item xs={12}>
      <SectionLayout id="schedule-section" aria-label="Schedule Section">
        <Typography variant="h2" component="h2">
          Schedule
        </Typography>
        {/* <DateNavigator events={sortedData} /> */}
        <Box
          sx={{
            padding: ".5rem",
            maxHeight: "425px",
            overflowY: "auto",
            scrollbarWidth: "none",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            [theme.breakpoints.up("md")]: {
              maxHeight: "525px",
            },
            [theme.breakpoints.up("laptop")]: {
              maxHeight: "635px",
            },
          }}
        >
          {sortedData.map((gameData, index) => (
            <ScheduleItem data={gameData} key={index} index={index} isPast={gameData.isPast} />
          ))}
        </Box>
        <Stack direction="column" alignItems="center" justifyContent="center" mt={2}>
          <Typography component="span" variant="span" sx={{ color: theme.palette.secondary.main }}>
            Continue Scrolling
          </Typography>
          <KeyboardArrowDownIcon sx={{ color: theme.palette.secondary.main }} />
        </Stack>
      </SectionLayout>
    </Grid>
  );
}
