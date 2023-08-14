import { Box, Button, Typography, styled } from "@mui/material";
import React from "react";

export default function Toggles({ setCurrentSeason, currentSeason }) {
  const handleClick = (event) => setCurrentSeason(event.currentTarget.id);

  const StyledText = styled(Typography)(({ currentSeason, type }) => ({
    textDecoration: currentSeason === type && "underline",
  }));

  const BUTTON_TYPES = [
    {
      type: "spring",
    },
    {
      type: "summer",
    },
    {
      type: "fall",
    },
  ];
  return (
    <Box sx={{ display: "flex", justifyContent: "center", gap: 4, mb: 4 }}>
      {BUTTON_TYPES.map(({ type }, index) => {
        return (
          <Button key={type + (index + 1)} id={type} onClick={handleClick} size="small">
            <StyledText currentSeason={currentSeason} type={type}>
              {type}
            </StyledText>
          </Button>
        );
      })}
    </Box>
  );
}
