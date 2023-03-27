import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import aleman from "../../assets/imageSlider/Aleman2.jpg"
import bega from "../../assets/imageSlider/Bega1.jpg"
import dom from "../../assets/imageSlider/Dom2.jpg"
import medley1 from "../../assets/imageSlider/Medleyhitting.jpg"
import medley2 from "../../assets/imageSlider/Medleywatching.jpg"




const items = [
    <img src={aleman} alt="batting" className="item" data-value="1" style={{width:"100%"}}/>,
    <img src={bega} alt="pitching"  className="item" data-value="2" style={{width:"100%"}}/>,
    <img src={dom} alt="pitching" className="item" data-value="3" style={{width:"100%"}}/>,
    <img src={medley1} alt="hitting" className="item" data-value="4" style={{width:"100%"}}/>,
    <img src={medley2} alt="running" className="item" data-value="5" style={{width:"100%"}}/>,
];

export default function ImageSlider() {
  return (
    <Grid item xs={12} md={4} lg={5}>
      <Box sx={{ height: "100%", minHeight: "300px" }}>
        <Typography sx={{textAlign:"center",color:"#009A4E", fontSize:"25px"}}>
      GO BLAZERS!
    </Typography>
        <AliceCarousel
          autoPlay
          disableDotsControls
        mouseTracking
        items={items}
        controlsStrategy="alternate"
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
