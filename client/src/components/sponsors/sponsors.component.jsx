import { Box, Grid } from "@mui/material";
import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

// Sponsor images
import casa from "../../assets/homePage/sponsors/casa.webp";
import ken from "../../assets/homePage/sponsors/ken.webp";
import maddios from "../../assets/homePage/sponsors/maddios.webp";
import security from "../../assets/homePage/sponsors/security.webp";
import usbank from "../../assets/homePage/sponsors/usbank.webp";
import zynex from "../../assets/homePage/sponsors/zynex.webp";

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 3 },
};

const items = [
  <img
    src={casa}
    alt="casa gutierrez"
    className="item"
    data-value="1"
    style={{ width: "300px", display: "flex", margin: "auto", paddingTop: "50px" }}
  />,
  <img src={ken} alt="kens auto service" className="item" data-value="2" style={{ width: "300px", display: "flex", margin: "auto" }} />,
  <img src={maddios} alt="uncle maddios pizza" className="item" data-value="3" style={{ width: "300px", display: "flex", margin: "auto" }} />,
  <img src={security} alt="security credit union" className="item" data-value="4" style={{ width: "300px", display: "flex", margin: "auto" }} />,
  <img src={usbank} alt="usbank" className="item" data-value="5" style={{ width: "300px", display: "flex", margin: "auto" }} />,
  <img src={zynex} alt="zynex" className="item" data-value="6" style={{ width: "300px", display: "flex", margin: "auto" }} />,
];

export default function Sponsors() {
  return (
    <>
      <Grid item xs={12} mt={15}>
        <Box sx={{ minHeight: { xs: "200px", md: "260px", lg: "300x" }, display: "flex", justifyItems: "center" }}>
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
            animationDuration={3000}
          />
        </Box>
      </Grid>
    </>
  );
}
