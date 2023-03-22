import { Box, Button } from "@mui/material";
import React from "react";

export default function Toggles({ setCurrentSeason }) {
  const handleClick = (event) => setCurrentSeason(event.currentTarget.id);
  return (
    <Box sx={{ display: "flex", gap: 4, my : 5}}> 
      <Button id="spring" onClick={handleClick} size="small">
        Spring
      </Button>
      <Button id="summer" onClick={handleClick} size="small">
        Summer
      </Button>
      <Button id="fall" onClick={handleClick} size="small">
        Fall
      </Button>
    </Box>
  );
}
