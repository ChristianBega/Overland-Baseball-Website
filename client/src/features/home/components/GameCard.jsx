import React from "react";
import { Stack } from "@mui/material";
import { TeamLogo } from "../../../utils/theme/index.styles";
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
  StatusChip,
  PastStatusChip,
  TeamLogoAvatar,
} from "./GameCard.styles";
import { formatDateTimeForCalendar } from "../../../utils/helpers/formatDate";
import addToCalendarOrOpenMaps from "../../../utils/helpers/addToCalendarOrOpenMaps";

const GameCard = ({ data }) => {
  const { opponent, location, isPast, startDateTime, endDateTime, away, opponentIcon } = data;
  const formattedTime = new Date(startDateTime).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const displayDate = formatDateTimeForCalendar(startDateTime);
  const descriptionAndAriaLabel = `Overland vs ${opponent} on ${displayDate} at ${formattedTime} at ${location}. ${away ? "Away" : "Home"} game.${isPast ? " Past game." : ""}`;

  return (
    <StyledGameCard
      onClick={!isPast && ((e) => addToCalendarOrOpenMaps(e, "date"))}
      role="article"
      aria-label={descriptionAndAriaLabel}
      isPast={isPast}
      data-startDateTime={startDateTime}
      data-endDateTime={endDateTime}
      data-eventTitle={`Overland vs ${opponent}`}
      data-eventLocation={location}
      data-eventDescription={descriptionAndAriaLabel}
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

          {isPast ? (
            <PastStatusChip label="Past" size="small" />
          ) : (
            <StatusChip label={away ? "Away" : "Home"} color="success" isHome={away} size="small" />
          )}
        </StyledTimeStatusStack>

        {/* Opponent Team */}
        <StyledTeamStack>
          {opponentIcon?.url ? (
            <TeamLogo component="img" src={opponentIcon.url} alt={`${opponent} team logo`} sx={{ mb: 1 }} />
          ) : (
            <TeamLogoAvatar sx={{ mb: 1 }}>{opponent.charAt(0)}</TeamLogoAvatar>
          )}
          <StyledOpponentName variant="body2" component="span" title={opponent}>
            {opponent}
          </StyledOpponentName>
        </StyledTeamStack>
      </Stack>
    </StyledGameCard>
  );
};

export default GameCard;
