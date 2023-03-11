import { Grid } from "@mui/material";

// Components
import News from "../components/home/news.component";
import HeroBackground from "../components/home/heroBg.component";
import ScheduleItem from "../components/home/scheduleItem.component";
import Sponsors from "../components/sponsors/sponsors.component";
import TeamStore from "../components/home/teamStore.component";
import Test from "../components/home/test.components";

export default function HomePage() {
  return (
    <>
      <HeroBackground />
      <Grid container maxWidth="xl" marginX={{ lg: "auto" }} spacing={{ xs: 2, md: 4 }}>
        <News />
        <Test />
        <ScheduleItem />
        <TeamStore />
        <Sponsors />
      </Grid>
    </>
  );
}
