// import { useTheme } from "@emotion/react";
import { Box, Grid, useMediaQuery } from "@mui/material";
import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useTheme } from "@emotion/react";

import { imageSliderData } from "../../websiteData/home.data";

const renderImages = (isBetween, isDesktop) => {
  return imageSliderData.map(({ imageUrl, description }, index) => {
    return (
      <img
        fetchpriority="high"
        key={index}
        src={imageUrl.small}
        alt={description}
        srcSet={`
            ${imageUrl?.small} 1x,
            ${imageUrl?.medium} 2x,
          `}
        style={{ display: "flex", margin: "auto", height: "475px" }}

        // style={(isBetween ? { minHeight: "475px" } : isDesktop ? { minHeight: "450px" } : { height: "350px" }, { minWidth: "100%" })}
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
    </Grid>
  );
}
