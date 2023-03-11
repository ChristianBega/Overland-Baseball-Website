import { Box } from "@mui/material";
import React from "react";

import HeroImage from "../../assets/heroImg.jpg";
export default function HeroBackground() {
  return (
    <section id="hero-background" style={{ position: "relative" }}>
      <Box
        component="img"
        src={HeroImage}
        sx={{ width: "100vw", height: "100vh", objectFit: "cover", position: "absolute", top: 0, bottom: 0, zIndex: -1 }}
      ></Box>
    </section>
  );
}

// mobile - 800 X 1200
// desktop - 500 x 1600

// desktop -
// a. image must be at least 1,200 pixels wide with a 16:9 aspect ratio.
// b. ideal hero image size -  1600 x 500 pixels.

// mobile -
// a. ideal hero image size - 800 x 1,200 pixels
