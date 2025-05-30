import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import { imageSliderData } from "../../../../../websiteData/home.data";

import { Box } from "@mui/material";
// Slider Images
import aleman2 from "../../../assets/imagesSlider/Aleman2.webp";
import aleman2Sm from "../../../assets/imagesSlider/mobileImages/Aleman2-sm.webp";

import aleman2Md from "../../../assets/imagesSlider/tabletImages/Aleman2-md.webp";

import bega from "../../../assets/imagesSlider/Bega1.webp";
import begaSm from "../../../assets/imagesSlider/mobileImages/Bega1-sm.webp";
import begaMd from "../../../assets/imagesSlider/tabletImages/Bega1-md.webp";

import bega3 from "../../../assets/imagesSlider/Bega3.webp";
import bega3Sm from "../../../assets/imagesSlider/mobileImages/Bega3-sm.webp";
import bega3Md from "../../../assets/imagesSlider/tabletImages/Bega3-md.webp";

import cox from "../../../assets/imagesSlider/Cox2.webp";
import coxSm from "../../../assets/imagesSlider/mobileImages/Cox2-sm.webp";
import coxMd from "../../../assets/imagesSlider/tabletImages/Cox2-md.webp";

import dom from "../../../assets/imagesSlider/Dom2.webp";
import domSm from "../../../assets/imagesSlider/mobileImages/Dom2-sm.webp";
import domMd from "../../../assets/imagesSlider/tabletImages/Dom2-md.webp";

import medley1 from "../../../assets/imagesSlider/Medleyhitting.webp";
import medley1Sm from "../../../assets/imagesSlider/mobileImages/Medleyhitting-sm.webp";
import medley1Md from "../../../assets/imagesSlider/tabletImages/Medleyhitting-md.webp";

import medley3 from "../../../assets/imagesSlider/Medley3.webp";
import medley3Sm from "../../../assets/imagesSlider/mobileImages/Medley3-sm.webp";
import medley3Md from "../../../assets/imagesSlider/tabletImages/Medley3-md.webp";
const imageSliderData = [
  {
    imageUrl: { small: aleman2Sm, medium: aleman2Md, original: aleman2 },
    description: "Right handed batter Aleman taking a huge swing at home plate.",
  },
  { imageUrl: { small: begaSm, medium: begaMd, original: bega }, description: "Bega pitching..." },
  { imageUrl: { small: bega3Sm, medium: bega3Md, original: bega3 }, description: "Bega first base..." },
  { imageUrl: { small: coxSm, medium: coxMd, original: cox }, description: "Cox fielding..." },
  { imageUrl: { small: domSm, medium: domMd, original: dom }, description: "Dom throwing..." },
  { imageUrl: { small: medley1Sm, medium: medley1Md, original: medley1 }, description: "Medley hitting..." },
  { imageUrl: { small: medley3Sm, medium: medley3Md, original: medley3 }, description: "Medley running bases..." },
];

const NewsImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageSliderData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ position: "relative", width: "100%", height: { xs: "345px" } }}>
      <AnimatePresence>
        <motion.img
          key={imageSliderData[currentIndex].imageUrl.original}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "4px",
            boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.3)",
          }}
          src={imageSliderData[currentIndex].imageUrl.original}
          alt={imageSliderData[currentIndex].description}
          srcSet={`
            ${imageSliderData[currentIndex].imageUrl.small} 349w,
            ${imageSliderData[currentIndex].imageUrl.medium} 492w,
            ${imageSliderData[currentIndex].imageUrl.original} 600w,
          `}
          sizes="(min-width: 740px) 711px, calc(96.19vw + 18px)"
        />
      </AnimatePresence>
    </Box>
  );
};

export default NewsImageSlider;

// TODO: While in view animate, if not then stop the animation.
