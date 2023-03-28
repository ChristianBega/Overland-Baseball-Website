import { Box, Grid } from "@mui/material";
import React from "react";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import spotify from "../../assets/spotify.jpg"
import github from "../../assets/gitHub.jpg"
import adobe from "../../assets/adobe.jpg"
import fedex from "../../assets/fedex.jpg"
import chevy from "../../assets/chevy.jpg"

const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
};

const items = [
    <img src={spotify} alt={spotify} className="item" data-value="1" style={{width:"450px"}}/>,
    <img src={github} alt={github} className="item" data-value="2" style={{width:"450px"}}/>,
    <img src={adobe} alt={adobe} className="item" data-value="3" style={{width:"450px"}}/>,
    <img src={fedex} alt={fedex} className="item" data-value="4" style={{width:"450px"}}/>,
    <img src={chevy} alt={chevy} className="item" data-value="5" style={{width:"450px"}}/>,
];


export default function Sponsors() {
  return (
    <>
      <Grid item xs={12} mt={10}>
        <Box sx={{ minHeight: { xs: "200px", md: "260px", lg: "300x" } }}>
           <AliceCarousel
          autoPlay
          disableDotsControls
        mouseTracking
        items={items}
        responsive={responsive}
        controlsStrategy="alternate"
        infinite
        autoPlayStrategy="none"
        autoPlayInterval={1000}
        animationDuration={1000}
    />
        </Box>
      </Grid>
    </>
  );
}
