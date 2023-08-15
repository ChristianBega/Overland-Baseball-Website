import React, { useState } from "react";
import Grid from "@mui/material/Grid/Grid";
import { Typography, Box, styled, Button } from "@mui/material";

import { fundraisersCardData } from "../../websiteData/events.data";
import { eventData } from "../../websiteData/events.data";

import FundraiserModal from "../modals/fundraiserModal.component";

const StyledImageBox = styled(Box)(({ theme }) => ({
  objectFit: "cover",
  height: "100%",
  width: "100%",
  minHeight: "300px",
  maxHeight: "325px",
  filter: "blur(3px)",
}));

const StyledOverlay = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: ".9rem 0 0 .9rem",
  padding: "1rem",
  position: "absolute",
  inset: 0,
  backgroundColor: "rgba(0, 0, 0, 0.54)",
  "&:hover": {
    boxShadow: `0px 0px 12px 1px ${theme.palette.secondary.light}`,
    transition: ".3s ease-in",
  },
}));

export default function Fundraisers() {
  const [open, setOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState();
  const [events, setEvents] = useState();
  const handleOpen = (event) => {
    let currentEventId = event.currentTarget.parentElement.id;

    let filterEventsArray = eventData.filter((event) => event.eventName.includes(currentEventId));
    setCurrentEvent(currentEventId);
    setEvents(filterEventsArray);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  return (
    <Grid id="fundraiser-and-events" item xs={12} mt={{ xs: 5, sm: 10, md: 15 }}>
      <Typography typography="h2">Upcoming fundraisers</Typography>
      <Grid container maxWidth="lg" spacing={4}>
        {fundraisersCardData.map((fundraiser, index) => (
          <Grid sx={{ position: "relative" }} id={fundraiser.eventName} item key={index} xs={12} sm={6} md={3}>
            <StyledImageBox component="img" src={fundraiser.image}></StyledImageBox>
            <StyledOverlay>
              <Typography typography="h3">{fundraiser.eventName} Events</Typography>
              <Box textAlign="center">
                <Button size="md" onClick={handleOpen}>
                  Sign up!
                </Button>
              </Box>
            </StyledOverlay>
            <FundraiserModal open={open} handleClose={handleClose} events={events} currentEvent={currentEvent} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
