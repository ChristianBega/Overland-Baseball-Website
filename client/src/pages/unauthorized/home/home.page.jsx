import { Container, Grid } from "@mui/material";
import React from "react";
// Components
import Hero from "./components/hero/hero.component";
import News from "./components/news/news.component";
import Events from "./components/events/events.components";
import Schedule from "./components/schedule/schedule.component";

const HomePage = () => {
  return (
    <>
      <Hero />
      <Container component="main" id="home-page" aria-label="Home Page">
        <Grid container id="home-page-grid">
          <News />
          <Events />
          <Schedule />
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;
{
  /* <Typography typography="h2" component="h2" sx={{ textAlign: "center", color: theme.palette.primary.main, mb: 10 }}>
        Spring 2023 Schedule
      </Typography>
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table aria-label="schedule table">
          <TableBody>
            {sortedData?.map((gameData, index) => (
              <ScheduleItem data={gameData} key={index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer> */
}
