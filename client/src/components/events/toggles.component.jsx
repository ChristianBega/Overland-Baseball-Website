import { Box, Typography, styled } from "@mui/material";
import React from "react";

export default function Toggles({ setCurrentSeason, currentSeason, toggleType }) {
  const handleClick = (event) => setCurrentSeason(event.currentTarget.id);

  const StyledText = styled(Typography)(({ theme, currentSeason, type }) => ({
    backgroundColor: currentSeason === type && theme.palette.primary.light,
    color: currentSeason === type && theme.palette.text.primary,
    padding: ".2rem 1rem",
    transition: "all 1s ease-In-Out",
    textDecoration: currentSeason !== type && "underline",

    "&:hover": {
      cursor: currentSeason === type && "none",
      color: theme.palette.secondary.dark,
      transform: "scale(1)",
    },
  }));

  const StyledToggleContainer = styled(Box)(({ theme }) => ({
    width: "200px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing(4),
    [theme.breakpoints.up("md")]: {
      justifyContent: "flex-start",
    },
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

  const BUTTON_TYPES_WORKOUTS = [
    {
      type: "spring",
    },
    {
      type: "fall",
    },
    {
      type: "winter",
    },
  ];
  return (
    <StyledToggleContainer>
      {toggleType === "workouts"
        ? BUTTON_TYPES_WORKOUTS.map(({ type }, index) => {
            return (
              <StyledText typography="linkText" key={type + (index + 1)} id={type} onClick={handleClick} currentSeason={currentSeason} type={type}>
                {type}
                {toggleType === "workouts" && type === "fall" && null}
              </StyledText>
            );
          })
        : BUTTON_TYPES.map(({ type }, index) => {
            return (
              <StyledText typography="linkText" key={type + (index + 2)} id={type} onClick={handleClick} currentSeason={currentSeason} type={type}>
                {type}
                {toggleType === "workouts" && type === "fall" && null}
              </StyledText>
            );
          })}
    </StyledToggleContainer>
  );
}
