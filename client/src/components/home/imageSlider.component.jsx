// import { useTheme } from "@emotion/react";
import { Box, Grid, useMediaQuery } from "@mui/material";
import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import aleman2 from "../../assets/imagesSlider/Aleman2.webp";
import bega from "../../assets/imagesSlider/Bega1.webp";
import bega3 from "../../assets/imagesSlider/Bega3.webp";
import cox from "../../assets/imagesSlider/Cox2.webp";
import dom from "../../assets/imagesSlider/Dom2.webp";
import medley1 from "../../assets/imagesSlider/Medleyhitting.webp";
import medley2 from "../../assets/imagesSlider/Medleywatching.webp";
import medley3 from "../../assets/imagesSlider/Medley3.webp";
import { useTheme } from "@emotion/react";

const itemsMobile = [
  <img src={aleman2} alt="hitting" className="item" style={{ width: "100%", height: "350px" }} />,
  <img src={bega} alt="pitching" className="item" style={{ width: "100%", height: "350px" }} />,
  <img src={dom} alt="pitching" className="item" style={{ width: "100%", height: "350px" }} />,
  <img src={medley3} alt="running" className="item" style={{ width: "100%", height: "350px" }} />,
  <img src={medley1} alt="hitting" className="item" style={{ width: "100%", height: "350px" }} />,
  <img src={cox} alt="running" className="item" style={{ width: "100%", height: "350px" }} />,
  <img src={bega3} alt="catching" className="item" style={{ width: "100%", height: "350px" }} />,
  <img src={medley2} alt="running" className="item" data-value="6" style={{ width: "100%", height: "350px" }} />,
];
const itemsDesktop = [
  <img src={aleman2} alt="hitting" className="item" style={{ width: "100%", height: "450px" }} />,
  <img src={bega} alt="pitching" className="item" style={{ width: "100%", height: "450px" }} />,
  <img src={dom} alt="pitching" className="item" style={{ width: "100%", height: "450px" }} />,
  <img src={medley3} alt="running" className="item" style={{ width: "100%", height: "450px" }} />,
  <img src={medley1} alt="hitting" className="item" style={{ width: "100%", height: "450px" }} />,
  <img src={cox} alt="running" className="item" style={{ width: "100%", height: "450px" }} />,
  <img src={bega3} alt="catching" className="item" style={{ width: "100%", height: "450px" }} />,
  <img src={medley2} alt="running" className="item" data-value="6" style={{ width: "100%", height: "450px" }} />,
];
const itemsIsBetween = [
  <img src={aleman2} alt="hitting" className="item" style={{ width: "100%", height: "475px" }} />,
  <img src={bega} alt="pitching" className="item" style={{ width: "100%", height: "475px" }} />,
  <img src={dom} alt="pitching" className="item" style={{ width: "100%", height: "475px" }} />,
  <img src={medley3} alt="running" className="item" style={{ width: "100%", height: "475px" }} />,
  <img src={medley1} alt="hitting" className="item" style={{ width: "100%", height: "475px" }} />,
  <img src={cox} alt="running" className="item" style={{ width: "100%", height: "475px" }} />,
  <img src={bega3} alt="catching" className="item" style={{ width: "100%", height: "475px" }} />,
  <img src={medley2} alt="running" className="item" data-value="6" style={{ width: "100%", height: "475px" }} />,
];

export default function ImageSlider() {
  const theme = useTheme();
  const isBetween = useMediaQuery(theme.breakpoints.between("685", "lg"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Grid item xs={12} md={5} lg={6} sx={{ margin: "auto 0" }}>
      <Box sx={{ height: "100%", minHeight: 300 }}>
        <Box sx={{ boxShadow: 15 }}>
          <AliceCarousel
            autoPlay
            disableDotsControls
            mouseTracking
            items={isBetween ? itemsIsBetween : isDesktop ? itemsDesktop : itemsMobile}
            controlsStrategy="alternate"
            disableButtonsControls
            infinite
            animationType="fadeout"
            autoPlayStrategy="none"
            autoPlayInterval={1000}
            animationDuration={2000}
          />
        </Box>
      </Box>
    </Grid>
  );
}
