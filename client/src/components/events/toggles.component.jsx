import { Box, Button } from "@mui/material";
import React from "react";

export default function Toggles({ setCurrentSeason }) {
  const handleClick = (event) => {
    setCurrentSeason(event.currentTarget.id);
  };
  return (
    <Box>
      <Button id="spring" onClick={handleClick} size="medium">
        Spring
      </Button>
      <Button id="summer" onClick={handleClick} size="medium">
        Summer
      </Button>
      <Button id="fall" onClick={handleClick} size="medium">
        Fall
      </Button>
    </Box>
  );
}
