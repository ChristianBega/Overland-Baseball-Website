import styled from "@emotion/styled";
import { Box, Paper, Typography } from "@mui/material";
import React from "react";

import HeroImage from "../../assets/heroImg.jpg";

const StyledPaper = styled(Paper)(({ theme }) => ({
  // display: "flex",
  // justifyContent: "space-between",
  margin: theme.spacing(8),
  textAlign: "center",
  padding: theme.spacing(6), // 14px
  color: theme.palette.text.primary,
  background: theme.palette.accent.accentOne,
}));
export default function HeroBackground() {
  return (
    <Box component="section" style={{ minHeight: "92vh" }} id="hero-background">
      <Box
        component="img"
        alt="A picture taken from home plate, looking out into a baseball field. "
        src={HeroImage}
        sx={{ width: "100vw", height: "96vh", objectFit: "cover", position: "absolute", top: 0, bottom: 0, zIndex: -1, mt: 15 }}
      ></Box>
      <StyledPaper>
        <Typography typography="h1">Overland Baseball</Typography>
        <Typography typography="bodyTextLg" mt={4}>
          Dignissimos et possimus autem in aspernatur possimus id expedita atque. Ut galisum nostrum in galisum omnis sit voluptatem ipsa sit enim
          cumque et voluptatem facilis!
        </Typography>
      </StyledPaper>
    </Box>
  );
}

// mobile - 800 X 1200
// desktop - 500 x 1600

// desktop -
// a. image must be at least 1,200 pixels wide with a 16:9 aspect ratio.
// b. ideal hero image size -  1600 x 500 pixels.

// mobile -
// a. ideal hero image size - 800 x 1,200 pixels
