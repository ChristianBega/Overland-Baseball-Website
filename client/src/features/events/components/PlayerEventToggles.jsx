import React from "react";
import { Button, Stack } from "@mui/material";
import { useTheme } from "@emotion/react";

const PlayerEventToggles = ({ currentSeason, onSeasonChange, playerEvents = [], availableSeasons = ["Spring", "Summer", "Fall"] }) => {
  const theme = useTheme();

  // Filter available seasons to only show those with active events
  const seasonsWithActiveEvents = availableSeasons.filter((season) => {
    return playerEvents.some((event) => event.seasons?.[season.toLowerCase()]?.active === true);
  });

  // If no seasons have active events, show all seasons (fallback)
  const seasonsToShow = seasonsWithActiveEvents.length > 0 ? seasonsWithActiveEvents : availableSeasons;

  return (
    <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 4 }}>
      {seasonsToShow.map((season) => (
        <Button
          key={season}
          variant={currentSeason === season ? "pillShapeActive" : "pillShapeInactive"}
          onClick={() => onSeasonChange(season)}
          sx={{
            color: currentSeason === season ? "#fff" : theme.palette.text.grey,
            minWidth: "70px",
            fontSize: "14px",
            padding: "8px 16px",
            borderRadius: "20px",
            textTransform: "capitalize",
            "&:hover": {
              backgroundColor: currentSeason === season ? undefined : theme.palette.action.hover,
            },
          }}
        >
          {season}
        </Button>
      ))}
    </Stack>
  );
};

export default PlayerEventToggles;
