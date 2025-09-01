import React from "react";
import { Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import TextTruncate from "../../ui/components/TextTruncate";
import { EventCardCtas } from "../../ui/components/EventCtas";
import ButtonBlock from "../../ui/components/ButtonBlock";

const PlayerEventCard = ({ playerEvent, currentSeason, onRegister }) => {
  const { title, eventImage, seasons } = playerEvent || {};
  const currentSeasonData = seasons?.[currentSeason.toLowerCase()];
  const playerEventContent = currentSeasonData?.playerEventContent;

  // Get first paragraph for card description
  const description = playerEventContent?.split(/\n\s*\n/)[0]?.trim() || "Event details coming soon...";

  const handleRegister = () => {
    onRegister(playerEvent, currentSeason);
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardMedia
        component="img"
        image={eventImage}
        alt={title}
        sx={{ objectFit: "cover", borderRadius: "12px", mb: 2, maxHeight: { sm: "375px" }, minHeight: { md: "262px" } }}
      />

      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <EventCardCtas data={playerEvent} variant="minimalSmall" sx={{ mb: 1 }} />

        <Typography variant="h3" component="h3" gutterBottom>
          {title}
        </Typography>

        <TextTruncate
          text={description}
          maxChars={150}
          variant="body2"
          sx={{
            flexGrow: 1,
            mb: 2,
          }}
        />

        <ButtonBlock sx={{ width: { xs: "100%", sm: "50%", md: "100%", lg: "50%" } }}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleRegister}
            sx={{
              mt: 2,
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: "600",
            }}
          >
            Register Now!
          </Button>
        </ButtonBlock>
      </CardContent>
    </Card>
  );
};

export default PlayerEventCard;

// maxwidth 440px

// md --> flex direction row
