import React from "react";
import { Stack } from "@mui/material";
import { TeamLogo } from "../../../utils/theme/index.styles";
import { convertTo12HourFormat } from "../../../utils/helpers/convertTo24HourFormat";
import { StatusChip, TeamLogoAvatar } from "./ScheduleContentViewOnly.styles";
import overlandLogo from "../../../assets/homePage/teamLogos/overland.webp";
import {
  StyledGameCard,
  StyledCardHeader,
  StyledGameTitle,
  StyledDateDisplay,
  StyledTeamStack,
  StyledTeamName,
  StyledTimeStatusStack,
  StyledTimeDisplay,
  StyledOpponentName,
  StyledHiddenText,
} from "./GameCard.styles";

const GameCard = ({ data, onClick }) => {
  const { date, time, opponent, opponentIcon, location, home, isPast } = data;

  const formattedTime = convertTo12HourFormat(time);

  // Format date for display (e.g., "March 6, 2025")
  const displayDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const isHomeGame = home === "TRUE" || home === true;

  const handleCardClick = () => {
    if (!isPast && onClick) {
      onClick(data);
    }
  };

  return (
    <StyledGameCard
      onClick={handleCardClick}
      role="article"
      aria-label={`Game: Overland vs ${opponent} on ${displayDate} at ${formattedTime} at ${location}. ${isHomeGame ? "Home" : "Away"} game.`}
      isPast={isPast}
    >
      {/* Header: Semantic structure with visual design priorities */}
      <StyledCardHeader>
        {/* Semantic title - small and subtle for SEO/ADA */}
        <StyledGameTitle component="h3">Overland vs {opponent}</StyledGameTitle>

        {/* Visual primary: Date */}
        <StyledDateDisplay variant="h6" component="div">
          {displayDate}
        </StyledDateDisplay>
      </StyledCardHeader>

      {/* Main Game Content */}
      <Stack direction="row" alignItems="center" justifyContent="space-evenly" flex={1}>
        {/* Overland Team */}
        <StyledTeamStack>
          <TeamLogo component="img" src={overlandLogo} alt="Overland team logo" sx={{ mb: 1 }} />
          <StyledTeamName variant="body2" component="span">
            Overland
          </StyledTeamName>
        </StyledTeamStack>

        {/* Time and Status */}
        <StyledTimeStatusStack spacing={1}>
          <StyledTimeDisplay variant="h6" component="span">
            {formattedTime}
          </StyledTimeDisplay>

          {/* Hidden "vs" for screen readers */}
          <StyledHiddenText>versus</StyledHiddenText>

          <StatusChip label={isHomeGame ? "Home" : "Away"} color="success" isHome={isHomeGame} size="small" />
        </StyledTimeStatusStack>

        {/* Opponent Team */}
        <StyledTeamStack>
          {opponentIcon ? (
            <TeamLogo component="img" src={opponentIcon} alt={`${opponent} team logo`} sx={{ mb: 1 }} />
          ) : (
            <TeamLogoAvatar sx={{ mb: 1 }}>{opponent.charAt(0)}</TeamLogoAvatar>
          )}
          <StyledOpponentName
            variant="body2"
            component="span"
            title={opponent} // Tooltip for full team name
          >
            {opponent}
          </StyledOpponentName>
        </StyledTeamStack>
      </Stack>
    </StyledGameCard>
  );
};

export default GameCard;
