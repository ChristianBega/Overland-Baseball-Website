import { useTheme } from "@emotion/react";
import { Container, Grid, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import { containerVariants } from "../../../setup/framerAnimations/transitions";
// Components
import News from "./components/news/news.component";
import Schedule from "./components/schedule/schedule.component";
import Sponsors from "../../../components/sponsors/sponsors.component";
import ImageSlider from "./components/imageSlider/imageSlider.component";
import QuickLinksGrid from "./components/quickLinks/quickLinks.component";

export default function HomePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isBelowDesktop = useMediaQuery(theme.breakpoints.down("lg"));

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
        <Grid container rowSpacing="12" columnSpacing={isBelowDesktop ? 6 : 12} sx={{ justifyContent: "center", maxWidth: "1500px" }}>
          {isMd && <ImageSlider />}
          {isMobile && <ImageSlider />}
          <News />
          {!isBelowDesktop && <ImageSlider />}
          {!isMobile && <QuickLinksGrid />}
          <Schedule />
          {isMobile && <QuickLinksGrid />}
          <Sponsors />
        </Grid>
      </Container>
    </>
  );
}
