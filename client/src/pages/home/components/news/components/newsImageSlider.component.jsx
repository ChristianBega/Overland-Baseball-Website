import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { imageSliderData } from "../../../../../websiteData/home.data";
import { Box } from "@mui/material";
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
