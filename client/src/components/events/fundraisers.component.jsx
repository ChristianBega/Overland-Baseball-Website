import React, { useState } from "react";
import Grid from "@mui/material/Grid/Grid";
import { Typography, Box, styled, Button } from "@mui/material";

// Fundraiser data
import { fundraisersCardData } from "../../websiteData/events.data";
// Components
import FundraiserModal from "./fundraiserModal.component";
// Styled components
const StyledImageBox = styled(Box)(({ theme }) => ({
  objectFit: "cover",
  height: "100%",
  width: "100%",
  minHeight: "300px",
  maxHeight: "325px",
  "&:hover": {
    display: "block",
    cursor: "pointer",
    scale: "1.03",
    transition: ".2s all ease-in-out",
    boxShadow: `0px 0px 12px 1px ${theme.palette.secondary.light}`,
  },
}));
const StyledButton = styled(Button)(({ theme }) => ({
  height: "100%",
  width: "100%",
  padding: 0,
  backgroundColor: "transparent",
  "&:hover": {
    backgroundColor: "transparent",
  },
}));
// const StyledOverlay = styled(Box)(({ theme }) => ({
//   position: "absolute",
//   top: 0,
//   bottom: 0,
//   right: 0,
//   display: "none",
//   // left: "-10px",

//   backgroundColor: "rgba(0, 0, 0, 0.54)",
//   height: "100%",
//   width: "100%",
//   minHeight: "240px",
//   maxHeight: "250px",
// }));

export default function Fundraisers() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Grid item xs={12} mt={10}>
      <Typography typography="h3" sx={{ textAlign: "center", my: 10 }}>
        Upcoming fundraisers!
      </Typography>
      <Grid container maxWidth="lg" spacing={4}>
        {fundraisersCardData.map((fundraiser) => (
          <Grid item key={fundraiser.id} xs={12} sm={6} md={3}>
            {/* <StyledOverlay>
              <Typography>Hello world</Typography>
            </StyledOverlay> */}
            <StyledButton onClick={handleOpen} open={open} setOpen={setOpen}>
              <StyledImageBox component="img" boxShadow={10} src={fundraiser.image}>
                {/* When the image is hovered on, then transition text and overlay */}
              </StyledImageBox>
              <FundraiserModal open={open} handleClose={handleClose} />
            </StyledButton>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
//
