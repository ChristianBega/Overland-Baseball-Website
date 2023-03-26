import React from "react";
import Grid from "@mui/material/Grid/Grid";
import { Typography, Box } from "@mui/material";

import TournamentsImage from "../../assets/AmericanLegionTournament.jpeg";
import BroncosImage from "../../assets/broncosVolunteer.png";
import FieldCleanUpImage from "../../assets/fieldCleanUp.jpg";
import { styled } from "@mui/system";

// Styled components
const StyledImageBox = styled(Box)(({ theme }) => ({
  zIndex: 1,
  position: "relative",
  objectFit: "cover",
  height: "100%",
  width: "100%",
  maxHeight: "350px",
  border: `2px solid transparent`,

  "&:hover": {
    cursor: "pointer",
    border: `2px solid ${theme.palette.secondary.main}`,
    scale: "1.05",
  },
  "&:hover:after": {
    content: '"Testing"',
    position: "absolute",
    // display : "inlineBlock",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    // width: "100%",
    // height: "100%",
    // backgroundImage: "linear-gradient(120deg, #eaee44 #33d0ff)",
    color: "red",
    zIndex: 100,
  },
}));

const fundraisersData = [
  {
    id: "Name 1",
    content: "Broncos Games ",
    image: BroncosImage,

    date: "1-12-23",
    time: "11 am",
  },
  {
    id: "Name 2",
    content: "Overland tournaments",
    image: TournamentsImage,
    date: "2-12-23",
    time: "11 am",
  },
  {
    id: "Name 3",
    content: "Fall Clean Up",
    image: FieldCleanUpImage,

    date: "9-12-23",
    time: "1 pm",
  },
  {
    id: "Name 4",
    content: "box 4",
    image: TournamentsImage,

    date: "8-22-23",
    time: "8 pm",
  },
];

export default function Fundraisers() {
  return (
    <Grid item xs={12}>
      <Typography typography="h2" sx={{ textAlign: "center", my: 8 }}>
        Upcoming fundraisers!
      </Typography>
      <Grid container maxWidth="lg" spacing={4}>
        {fundraisersData.map((fundraiser) => (
          <Grid item key={fundraiser.id} xs={6} md={3}>
            <StyledImageBox component="img" boxShadow={10} src={fundraiser.image}>
              {/* {fundraiser.content} */}
            </StyledImageBox>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
