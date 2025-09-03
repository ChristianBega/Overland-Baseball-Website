import React from "react";
import PropTypes from "prop-types";
import { PlayerImage, Badge, TextBlock } from "../../ui";
import PlaceHolderImage from "../../../assets/coachRosterPlaceHolder.jpg";
import useMediaQueries from "../../../utils/helpers/useMediaQueries.utils";
import { StyledAlumniCard, StyledPlayerName, StyledInfoText, StyledPlayerImageContainer, StyledContentContainer } from "./AlumniCard.styles";

const AlumniCard = ({ alumni, ...rest }) => {
  const { playerName, position, birthDate, gradYear_Overland, higherLevel, college, playerImage } = alumni;
  const { isMd } = useMediaQueries();

  return (
    <StyledAlumniCard {...rest}>
      {/* Player Image */}
      <StyledPlayerImageContainer>
        <PlayerImage
          src={playerImage}
          placeholderSrc={PlaceHolderImage}
          alt={`${playerName} alumni photo`}
          height="100%"
          showGradient={false}
          sx={{ height: { xs: "150px", md: "170px" }, width: { xs: "120px", md: "130px" } }}
        />
      </StyledPlayerImageContainer>

      <StyledContentContainer>
        {/* Player Name and Year */}
        <TextBlock spacing={1} alignItems="center" direction="row" justifyContent="space-between">
          <StyledPlayerName variant={isMd ? "h5" : "h6"} component="h3">
            {playerName}
          </StyledPlayerName>
          <Badge badgeType="primary" size="small">
            {position}
          </Badge>
        </TextBlock>

        {/* Birth and Graduation Info */}
        <TextBlock spacing={0.5} direction="row" justifyContent="space-between" alignItems="center">
          <StyledInfoText variant="body2">
            <strong>Born:</strong> <br /> {birthDate}
          </StyledInfoText>
          <StyledInfoText variant="body2">
            <strong>Graduated:</strong> <br /> {gradYear_Overland}
          </StyledInfoText>
        </TextBlock>

        {/* Additional Info */}
        <TextBlock spacing={0.5} direction="row" justifyContent="space-between" alignItems="center">
          <StyledInfoText variant="body2">
            <strong>Level:</strong> <br /> {higherLevel}
          </StyledInfoText>
          <StyledInfoText truncate variant="body2">
            <strong>College:</strong> <br /> {college}
          </StyledInfoText>
        </TextBlock>
      </StyledContentContainer>
    </StyledAlumniCard>
  );
};

AlumniCard.propTypes = {
  alumni: PropTypes.shape({
    playerName: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    birthDate: PropTypes.string,
    gradYear_Overland: PropTypes.string,
    higherLevel: PropTypes.string,
    college: PropTypes.string,
    statsYear: PropTypes.string,
    playerImage: PropTypes.string,
  }).isRequired,
};

export default AlumniCard;
