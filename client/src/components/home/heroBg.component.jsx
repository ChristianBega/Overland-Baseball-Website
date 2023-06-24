import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import React from "react";

// Assets
import HeroImage from "../../assets/heroImageTest.jpg";
// Icons
import Downarrow from "../reusableComponents/downarrow/downarrow.component";

const StyledBox = styled(Box)(({ theme }) => ({
  textAlign: "center",
  color: theme.palette.text.primary,
  background: "none",
  position: "absolute",
  width: "100%",
  right: "50%",
  top: "38%",
  transform: "translate(50%,-50%)",
  [theme.breakpoints.up("md")]: {
    top: 145,
  },
  [theme.breakpoints.up("lg")]: {
    top: 200,
  },
}));

const StyledOverLay = styled(Box)(({ theme }) => ({
  background: "linear-gradient(0deg, rgba(37, 37, 37, 0.855) 30%, rgba(78, 78, 78, 0.3) 100%)",
  zIndex: "100",
}));
export default function HeroBackground() {
  return (
    <Box
      component="section"
      style={{
        minHeight: "68vh",
        position: "relative",
        overflow: "hidden",
      }}
      id="hero-background"
    >
      <StyledOverLay>
        <Box
          component="img"
          alt="A picture taken from home plate, looking out onto a baseball field. "
          src={HeroImage}
          sx={{
            width: "100vw",
            height: "68vh",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            bottom: 0,
            zIndex: -1,
          }}
        ></Box>
      </StyledOverLay>
      <StyledBox>
        <Typography sx={{ fontSize: { xs: "52px", sm: "65px", lg: "75px" } }} typography="headerText" component="h1" md={5}>
          Overland <br /> Trail Blazers
        </Typography>
      </StyledBox>
      <Downarrow />
    </Box>
  );
}
