// import { useTheme } from "@emotion/react";
import { Box, Grid } from "@mui/material";
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
  // const theme = useTheme();
  return (
    <Grid item xs={12} md={12} lg={6} sx={{ marginTop: { xs: 5, md: 15 } }}>
      <Box sx={{ height: "100%", minHeight: 300 }}>
        {/* <Typography typography="h3" sx={{ textAlign: "center", color: theme.palette.secondary.main, mb: 5}}>
          GO BLAZERS!
        </Typography> */}

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
