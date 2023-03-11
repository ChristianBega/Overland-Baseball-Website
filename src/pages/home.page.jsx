import { Grid } from "@mui/material";

// Components
import News from "../components/home/news.component";
import HeroBackground from "../components/home/heroBg.component";
import ScheduleItem from "../components/home/scheduleItem.component";
import Sponsors from "../components/sponsors/sponsors.component";
import TeamStore from "../components/home/teamStore.component";
import ImageSlider from "../components/home/imageSlider.component";

export default function HomePage() {
  return (
    <>
      <HeroBackground />
      <section id="home-section" style={{ display: "flex", justifyContent: " center" }}>
        <Grid container maxWidth="xl" spacing={{ xs: 2, md: 4 }}>
          <News />
          <ImageSlider />
          <ScheduleItem />
          <TeamStore />
          <Sponsors />
        </Grid>
      </section>
    </>
  );
}
