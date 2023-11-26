import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import React from "react";

// Assets
import HeroImage from "../../assets/heroImageTest.jpg";
// Icons
import Downarrow from "../../../../components/reusableComponents/downarrow/downarrow.component";

const StyledBox = styled(Box)(({ theme }) => ({
  textAlign: "center",
  color: theme.palette.text.primary,
  background: "none",
  position: "absolute",
  width: "100%",
  right: "50%",
  top: "38%",
  transform: "translate(50%,-50%)",
  [theme.breakpoints.up("sm")]: {
    top: "40%",
  },
  [theme.breakpoints.up("md")]: {
    top: "38%",
  },
  [theme.breakpoints.up("lg")]: {
    top: "35%",
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
      sx={{
        minHeight: { xs: "68vh", sm: "70vh", md: "70vh", lg: "89vh" },
        position: "relative",
        overflow: "hidden",
        marginBottom: { xs: 5, sm: 12, md: 10, lg: 20 },
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
            height: { xs: "68vh", sm: "70vh", md: "70vh", lg: "89vh" },
            objectFit: "cover",
            position: "absolute",
            top: 0,
            bottom: 0,
            zIndex: -1,
          }}
        ></Box>
      </StyledOverLay>
      <StyledBox>
        <Typography sx={{ fontSize: { xs: "52px", sm: "65px", md: "85px", lg: "120px" } }} typography="headerText" component="h1" md={5}>
          Overland <br /> Trail Blazers
        </Typography>
      </StyledBox>
      <Downarrow />
    </Box>
  );
}
