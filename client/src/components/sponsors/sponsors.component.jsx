import { Grid } from "@mui/material";
import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { sponsorData } from "../../websiteData/sponsors.data";

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 3 },
};

const renderImage = () => {
  return sponsorData.map(({ companyName, imageUrl }, index) => {
    return (
      <picture>
        <img
          fetchpriority="low"
          key={index}
          srcSet={`
            ${imageUrl?.small} 1x,
            ${imageUrl?.medium} 2x,
          `}
          src={imageUrl.small}
          style={{ display: "flex", margin: "auto", minHeight: "300px", maxWidth: "325px" }}
          alt={companyName}
          data-value={index + 1}
        />
      </picture>
    );
  });
};

export default function Sponsors() {
  return (
    <>
      <Grid item xs={12} mt={15}>
        <AliceCarousel
          autoPlay
          disableDotsControls
          mouseTracking
          items={renderImage()}
          responsive={responsive}
          controlsStrategy="alternate"
          infinite
          autoPlayStrategy="none"
          autoPlayInterval={1000}
          animationDuration={3000}
        />
      </Grid>
    </>
  );
}
