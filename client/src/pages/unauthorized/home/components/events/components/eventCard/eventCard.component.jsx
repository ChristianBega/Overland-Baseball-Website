import React from "react";
// MUI
import { Button, Card, CardActionArea, CardContent, Grid, Stack, styled, Typography } from "@mui/material";
// Icons
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const StyledDescriptionText = styled(Typography)(({ theme }) => ({
  position: "relative",
  maxHeight: "4em",
  overflow: "hidden",
  "&:after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "2em",
  },
}));
const EventCard = ({ card, index }) => {
  return (
    <Grid item xs={12}>
      <Card key={card.title} variant={index === 0 ? "events-main" : "events-secondary"} sx={{ backgroundImage: `url(${card?.image})` }}>
        <Stack direction="row" spacing={2} sx={{ justifyContent: "flex-end", zIndex: 1 }}>
          {card.cta.map((cta, index) => (
            <React.Fragment key={index}>
              {Object.entries(cta).map(([key, value]) => (
                <Button
                  key={key}
                  variant="contained"
                  color="secondary"  
                  size="card"
                  startIcon={key === "date" ? <CalendarMonthIcon /> : <LocationOnIcon />}
                >
                  {value.date || value.location}
                </Button>
              ))}
            </React.Fragment>
          ))}
        </Stack>
        <CardContent sx={{ color: "#fff", zIndex: 1 }}>
          <Typography variant="h3" component="h3" gutterBottom={index === 0 ? true : false}>
            {card.title}
          </Typography>
          {index === 0 && (
            <StyledDescriptionText cardType={index === 0 ? "main" : "secondary"} variant="body2" component="p">
              {card.description}
            </StyledDescriptionText>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};
export default EventCard;
