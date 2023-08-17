// import { useTheme } from "@emotion/react";
import { Box, Grid, useMediaQuery } from "@mui/material";
import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useTheme } from "@emotion/react";

import aleman2 from "../../assets/imagesSlider/Aleman2.webp";
import bega from "../../assets/imagesSlider/Bega1.webp";
import bega3 from "../../assets/imagesSlider/Bega3.webp";
import cox from "../../assets/imagesSlider/Cox2.webp";
import dom from "../../assets/imagesSlider/Dom2.webp";
import medley1 from "../../assets/imagesSlider/Medleyhitting.webp";
import medley2 from "../../assets/imagesSlider/Medleywatching.webp";
import medley3 from "../../assets/imagesSlider/Medley3.webp";

const images = [aleman2, bega, bega3, cox, dom, medley1, medley2, medley3];

const renderImages = (isBetween, isDesktop) => {
  return images.map((image, index) => {
    return (
      <img
        key={index}
        src={image}
        style={(isBetween ? { minHeight: "475px" } : isDesktop ? { minHeight: "450px" } : { height: "350px" }, { width: "100%" })}
        alt="Overland baseball player sports action photos."
      />
    );
  });
};

export default function ImageSlider() {
  const theme = useTheme();
  const isBetween = useMediaQuery(theme.breakpoints.between("685", "lg"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Grid item xs={12} md={8} lg={6} sx={{ margin: "auto 0" }}>
      <Box sx={{ height: "100%" }}>
        <Box sx={{ boxShadow: 15 }}>
          <AliceCarousel
            autoPlay
            disableDotsControls
            mouseTracking
            items={renderImages(isBetween, isDesktop)}
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
