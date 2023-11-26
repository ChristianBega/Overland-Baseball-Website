// import { useTheme } from "@emotion/react";
import { Grid, useMediaQuery } from "@mui/material";
import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useTheme } from "@emotion/react";

import { imageSliderData } from "../../../../../websiteData/home.data";
//
const renderImages = (isBetween, isDesktop) => {
  return imageSliderData.map(({ imageUrl, description }, index) => {
    return (
      <img
        fetchpriority={index === 0 ? "high" : "low"}
        key={index}
        src={imageUrl.original}
        alt={description}
        srcSet={`
            ${imageUrl.small} 349w,
            ${imageUrl.medium} 492w,
            ${imageUrl.original} 600w,
          `}
        sizes="(min-width: 740px) 711px, calc(96.19vw + 18px)"
        style={{ display: "flex", margin: "auto", maxHeight: "475px" }}
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
        autoPlayInterval={2000}
        animationDuration={2000}
      />
    </Grid>
  );
}
