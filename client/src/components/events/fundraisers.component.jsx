import React, { useState } from "react";
import Grid from "@mui/material/Grid/Grid";
import { Typography, Box, styled, Button } from "@mui/material";
import { useTheme } from "@emotion/react";

// Site data
import { fundraisersCardData } from "../../websiteData/events.data";
import { eventData } from "../../websiteData/events.data";

import FundraiserModal from "../modals/fundraiserModal.component";
// Components
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
  padding: 4,
  border: `1px solid ${theme.palette.borders.primary}`,

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
  const [currentEvent, setCurrentEvent] = useState();
  const [events, setEvents] = useState();
  const theme = useTheme();
  const handleOpen = (event) => {
    let currentEventId = event.currentTarget.parentElement.id;

    let filterEventsArray = eventData.filter((event) => event.eventName.includes(currentEventId));
    setCurrentEvent(currentEventId);
    setEvents(filterEventsArray);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  return (
    <Grid item xs={12} mt={{ xs: 5, sm: 10, md: 15 }}>
      <Typography typography="h2" sx={{ color: theme.palette.primary.main, textAlign: "center", my: 10 }}>
        Upcoming fundraisers!
      </Typography>
      <Grid container maxWidth="lg" spacing={4}>
        {fundraisersCardData.map((fundraiser, index) => (
          <Grid id={fundraiser.eventName} item key={index} xs={12} sm={6} md={3}>
            {/* <StyledOverlay>
              <Typography>Hello world</Typography>
            </StyledOverlay> */}
            <StyledButton sx={{ boxShadow: 12 }} onClick={handleOpen}>
              <StyledImageBox component="img" src={fundraiser.image}>
                {/* When the image is hovered on, then transition text and overlay */}
              </StyledImageBox>
            </StyledButton>
            <FundraiserModal open={open} handleClose={handleClose} events={events} currentEvent={currentEvent} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
//
