import React from "react";
import PropTypes from "prop-types";
import { PlayerImage, Badge, TextBlock } from "../../ui";
import PlaceHolderImage from "../../../assets/coachRosterPlaceHolder.jpg";
import useMediaQueries from "../../../utils/helpers/useMediaQueries.utils";
import { StyledAlumniCard, StyledPlayerName, StyledInfoText, StyledPlayerImageContainer, StyledContentContainer } from "./AlumniCard.styles";
import { formatDateStringShort } from "../../../utils/helpers/formatDate";

const abbrListOfHighestLevelOfPlay = {
  "High School Only": "HS",
  "Junior College (JUCO)": "JUCO",
  "NCAA Division III": "D-III",
  "NCAA Division II": "D-II",
  "NCAA Division I": "D-I",
  "NAIA": "NAIA",
  "Independent League": "Indy",
  "Minor League (Rookie)": "MiLB-R",
  "Minor League (A)": "MiLB-A",
  "Minor League (AA)": "MiLB-AA",
  "Minor League (AAA)": "MiLB-AAA",
  "Major League Baseball (MLB)": "MLB",
  "International Professional": "Intl Pro",
};
const abbrListOfPositions = {
  "Pitcher": "P",
  "Catcher": "C",
  "First Base": "1B",
  "Second Base": "2B",
  "Third Base": "3B",
  "Shortstop": "SS",
  "Left Field": "LF",
  "Center Field": "CF",
  "Right Field": "RF",
};
const AlumniCard = ({ alumni, ...rest }) => {
  const { name, position, dateOfBirth, yearGraduated, college, image, highestLevelOfPlay } = alumni;
  const { isMd } = useMediaQueries();

  return (
    <StyledAlumniCard {...rest}>
      {/* Player Image */}
      <StyledPlayerImageContainer>
        <PlayerImage
          src={image?.url}
          placeholderSrc={PlaceHolderImage}
          alt={`${name} alumni photo`}
          height="100%"
          showGradient={false}
          sx={{ height: { xs: "150px", md: "170px" }, width: { xs: "120px", md: "130px" } }}
        />
      </StyledPlayerImageContainer>

      <StyledContentContainer>
        {/* Player Name and Year */}
        <TextBlock spacing={1} alignItems="center" direction="row" justifyContent="space-between">
          <StyledPlayerName variant={isMd ? "h5" : "h6"} component="h3">
            {name}
          </StyledPlayerName>
          <Badge badgeType="primary" size="small">
            {position ? abbrListOfPositions[position] : "n/a"}
          </Badge>
        </TextBlock>

        {/* Birth and Graduation Info */}
        <TextBlock spacing={0.5} direction="row" justifyContent="space-between" alignItems="center">
          <StyledInfoText variant="body2">
            <strong>Born:</strong> <br /> {formatDateStringShort(dateOfBirth)}
          </StyledInfoText>
          <StyledInfoText variant="body2">
            <strong>Graduated:</strong> <br /> {formatDateStringShort(yearGraduated)}
          </StyledInfoText>
        </TextBlock>

        {/* Additional Info */}
        <TextBlock spacing={0.5} direction="row" justifyContent="space-between" alignItems="center">
          <StyledInfoText variant="body2">
            <strong>Level:</strong> <br /> {highestLevelOfPlay ? abbrListOfHighestLevelOfPlay[highestLevelOfPlay] : "n/a"}
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
