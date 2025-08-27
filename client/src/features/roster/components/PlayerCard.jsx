// MUI Components
import { Stack } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
// Components
import TextBlock from "../../ui/components/TextBlock";
// Assets
import PlaceHolderImage from "../../../assets/coachRosterPlaceHolder.jpg";
import BaseBallBatIcon from "../../../assets/hugeicons_baseball-bat.svg";
import BaseBallIcon from "../../../assets/ph_baseball-duotone.svg";
import WeightIcon from "../../../assets/hugeicons_weight-scale.svg";
import HeightIcon from "../../../assets/healthicons_height-outline.svg";
// Utils
import useMediaQueries from "../../../utils/helpers/useMediaQueries.utils";
// Styled Components
import {
  StyledPlayerCard,
  StyledCardContent,
  StyledImageContainer,
  StyledPlayerImage,
  StyledPlaceholderImage,
  StyledPositionBadge,
  StyledPlayerName,
  StyledYearBadge,
  StyledStatItem,
  StyledStatIcon,
  StyledStatIconLarge,
} from "./PlayerCard.styles";

const PlayerCard = ({ player, ...rest }) => {
  const { name, position, playerImage, batting, throwing, yearAbbr, height, weight } = player;
  const { isTablet } = useMediaQueries();

  return (
    <StyledPlayerCard isTablet={isTablet} {...rest}>
      <StyledCardContent>
        <StyledImageContainer>
          {playerImage ? (
            <StyledPlayerImage component="img" src={playerImage} alt={`${name}`} />
          ) : (
            <StyledPlaceholderImage component="img" src={PlaceHolderImage} alt={`${name}`} />
          )}
        </StyledImageContainer>

        <TextBlock spacing={2} alignItems="center" justifyContent="center" mt={2} sx={{ width: "100%", mt: { xs: 2 } }}>
          <TextBlock direction="row" justifyContent="space-between" alignItems="center" sx={{ width: "100%" }}>
            <Stack direction="row" justifyContent="flex-start" alignItems="center" gap={1}>
              <StyledPositionBadge variant="body2" component="span">
                {position}
              </StyledPositionBadge>
              <StyledPlayerName variant="body1" component="span">
                {name}
              </StyledPlayerName>
            </Stack>
            <StyledYearBadge variant="small">{yearAbbr}</StyledYearBadge>
          </TextBlock>

          <TextBlock direction="row" justifyContent="space-between" alignItems="center" sx={{ width: "100%", textAlign: "left" }}>
            <StyledStatItem variant="small" component="span">
              <StyledStatIcon src={BaseBallBatIcon} alt="batting" />
              {batting || "update"}
            </StyledStatItem>
            <StyledStatItem variant="small" component="span">
              <StyledStatIconLarge src={BaseBallIcon} alt="throwing" />
              {throwing || "update"}
            </StyledStatItem>
          </TextBlock>

          <TextBlock direction="row" justifyContent="flex-start" alignItems="center" sx={{ width: "100%", textAlign: "left" }}>
            <StyledStatItem variant="small" component="span">
              <StyledStatIconLarge src={WeightIcon} alt="weight" />
              {weight}
            </StyledStatItem>
            <StyledStatItem variant="small" component="span">
              <StyledStatIconLarge src={HeightIcon} alt="height" />
              {height}
            </StyledStatItem>
          </TextBlock>
        </TextBlock>
      </StyledCardContent>
    </StyledPlayerCard>
  );
};

PlayerCard.propTypes = {
  player: PropTypes.object.isRequired,
};

export default PlayerCard;
