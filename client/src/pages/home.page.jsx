import { useTheme } from "@emotion/react";
import { Container, Grid, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import { containerVariants } from "../components/framerMotion/transitions";
// Components
import News from "../components/home/news.component";
import Schedule from "../components/home/schedule.component";
import Sponsors from "../components/sponsors/sponsors.component";
import ImageSlider from "../components/home/imageSlider.component";
import QuickLinksGrid from "../components/home/quickLinks.component";
import { useEffect } from "react";

export default function HomePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {/* <HeroBackground /> */}
      <Container
        component={motion.section}
        initial={containerVariants.hidden}
        animate={containerVariants.visible}
        exit={containerVariants.exit}
        transition={containerVariants.transition}
        id="home-section"
        style={{ display: "flex", justifyContent: " center", marginBlock: theme.spacing(8), maxWidth: "1500px" }}
      >
        <Grid container rowSpacing="12" columnSpacing="12" sx={{ justifyContent: "center", maxWidth: "1500px" }}>
          {isMobile && <ImageSlider />}
          <News />
          {!isMobile && <ImageSlider />}
          {!isMobile && <QuickLinksGrid />}
          <Schedule />
          {isMobile && <QuickLinksGrid />}
          <Sponsors />
        </Grid>
      </Container>
    </>
  );
}
