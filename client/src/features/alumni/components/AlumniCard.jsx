import React from "react";
import PropTypes from "prop-types";
import { Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { PlayerImage, StatItem, Badge, TextBlock } from "../../ui";
import PlaceHolderImage from "../../../assets/coachRosterPlaceHolder.jpg";
import useMediaQueries from "../../../utils/helpers/useMediaQueries.utils";

const StyledAlumniCard = styled("div")(({ theme }) => ({
  maxWidth: "350px",
  width: "100%",
  margin: "0 auto",
  padding: theme.spacing(2),
  borderRadius: "12px",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  backgroundColor: theme.palette.background.paper,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    maxWidth: "320px",
  },
  [theme.breakpoints.up("lg")]: {
    maxWidth: "300px",
  },
}));

const StyledPlayerName = styled(Typography)({
  fontSize: "18px",
  fontWeight: "600",
  textAlign: "center",
  textTransform: "capitalize",
});

const StyledInfoText = styled(Typography)({
  fontSize: "14px",
  textAlign: "center",
  color: "text.secondary",
});

const AlumniCard = ({ alumni, ...rest }) => {
  const { playerName, position, birthDate, gradYear_Overland, battingHand, throwingHand, higherLevel, college, statsYear, playerImage } = alumni;

  const { isTablet } = useMediaQueries();

  return (
    <StyledAlumniCard {...rest}>
      {/* Player Image */}
      <PlayerImage
        src={playerImage}
        placeholderSrc={PlaceHolderImage}
        alt={`${playerName} alumni photo`}
        height={isTablet ? "200px" : "180px"}
        showGradient={false}
      />

      {/* Player Name and Year */}
      <TextBlock spacing={1} alignItems="center">
        <StyledPlayerName variant="h6" component="h3">
          {playerName}
        </StyledPlayerName>
        <Stack direction="row" justifyContent="center" alignItems="center" gap={1}>
          <Badge badgeType="primary" size="small">
            {position}
          </Badge>
          <Badge badgeType="year" size="small" variant="small">
            {statsYear}
          </Badge>
        </Stack>
      </TextBlock>

      {/* Birth and Graduation Info */}
      <TextBlock spacing={1}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <StyledInfoText variant="body2">
            Born: <br /> {birthDate}
          </StyledInfoText>
          <StyledInfoText variant="body2">
            Graduated: <br /> {gradYear_Overland}
          </StyledInfoText>
        </Stack>
      </TextBlock>

      {/* Stats Row */}
      <TextBlock direction="row" justifyContent="space-between" alignItems="center">
        <StatItem variant="small" component="span" width="auto">
          <Typography variant="caption" color="text.secondary">
            B: {battingHand || "L"}
          </Typography>
        </StatItem>
        <StatItem variant="small" component="span" width="auto">
          <Typography variant="caption" color="text.secondary">
            T: {throwingHand || "R"}
          </Typography>
        </StatItem>
      </TextBlock>

      {/* Additional Info */}
      <TextBlock spacing={0.5}>
        <StyledInfoText variant="body2">
          <strong>Level:</strong> {higherLevel}
        </StyledInfoText>
        <StyledInfoText variant="body2">
          <strong>College:</strong> {college}
        </StyledInfoText>
      </TextBlock>
    </StyledAlumniCard>
  );
};

AlumniCard.propTypes = {
  alumni: PropTypes.shape({
    playerName: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    birthDate: PropTypes.string,
    gradYear_Overland: PropTypes.string,
    battingHand: PropTypes.string,
    throwingHand: PropTypes.string,
    higherLevel: PropTypes.string,
    college: PropTypes.string,
    statsYear: PropTypes.string,
    playerImage: PropTypes.string,
  }).isRequired,
};

export default AlumniCard;
