import { useTheme } from "@emotion/react";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import aleman2 from "../../assets/imageSlider/Aleman2.jpg";
import bega from "../../assets/imageSlider/Bega1.jpg";
import bega3 from "../../assets/imageSlider/Bega3.jpg";
import cox from "../../assets/imageSlider/Cox2.jpg";
import dom from "../../assets/imageSlider/Dom2.jpg";
import medley1 from "../../assets/imageSlider/Medleyhitting.jpg";
import medley2 from "../../assets/imageSlider/Medleywatching.jpg";
import medley3 from "../../assets/imageSlider/Medley3.jpg";

const items = [
  <img src={aleman2} alt="hitting" className="item" style={{ width: "100%" }} />,
  <img src={bega} alt="pitching" className="item" style={{ width: "100%" }} />,
  <img src={dom} alt="pitching" className="item" style={{ width: "100%" }} />,
  <img src={medley3} alt="running" className="item" style={{ width: "100%" }} />,
  <img src={medley1} alt="hitting" className="item" style={{ width: "100%" }} />,
  <img src={cox} alt="running" className="item" style={{ width: "100%" }} />,

  <img src={bega3} alt="catching" className="item" style={{ width: "100%" }} />,
  <img src={medley2} alt="running" className="item" data-value="6" style={{ width: "100%" }} />,
];

export default function ImageSlider() {
  const theme = useTheme();
  return (
    <Grid item xs={12} md={4} lg={5}>
      <Box sx={{ height: "100%", minHeight: "300px" }}>
        <Typography typography="h3" sx={{ textAlign: "center", color: theme.palette.secondary.main, mb: 5 }}>
          GO BLAZERS!
        </Typography>

        <Box sx={{ boxShadow: 15 }}>
          <AliceCarousel
            autoPlay
            disableDotsControls
            mouseTracking
            items={items}
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
