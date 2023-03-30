import styled from "@emotion/styled";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";

// Assets
import HeroImage from "../../assets/heroImg.jpg";

// Icons
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useTheme } from "@emotion/react";

const StyledBox = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(6), // 14px
  color: theme.palette.text.primary,
  background: "none",
  position: "absolute",
  top: "35%",
  right: "50%",
  transform: "translate(50%,-50%)",
  [theme.breakpoints.up("lg")]: {
    top: "35%",
  },

  minWidth: "95%",
}));
export default function HeroBackground() {
  const theme = useTheme();
  return (
    <Box component="section" style={{ minHeight: "96vh", position: "relative", overflow: "hidden" }} id="hero-background">
      <Box
        component="img"
        alt="A picture taken from home plate, looking out onto a baseball field. "
        src={HeroImage}
        sx={{ width: "100vw", minHeight: "96vh", objectFit: "cover", position: "absolute", top: 0, bottom: 0, zIndex: -1 }}
      ></Box>
      <StyledBox>
        <Typography
          typography="h1"
          sx={{
            backgroundColor: theme.palette.primary.light,
            backgroundImage: `linear-gradient(180deg, ${theme.palette.secondary.main}, ${theme.palette.primary.light})`,
            backgroundSize: "100%",
            WebkitBackgroundClip: "text",
            mozBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mozTextFillColor: "transparent",
            fontSize: "65px",
            maxWidth: "500px",
            margin: "auto",
          }}
          md={5}
        >
          Overland Trail Blazers
        </Typography>
        <Typography typography="bodyTextLg" sx={{ maxWidth: "500px", mt: 4, mx: "auto" }}>
          Dignissimos et possimus autem in aspernatur possimus id expedita atque. Ut galisum nostrum in galisum omnis sit voluptatem ipsa sit enim
          cumque et voluptatem facilis!
        </Typography>
      </StyledBox>
      <IconButton href="#home-section" sx={{ position: "absolute", bottom: 45, right: "50%", transform: "translate(50%,-50%)" }}>
        <ArrowDownwardIcon sx={{ color: "#fff", fontSize: "2.5rem" }} />
      </IconButton>
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
