import React from "react";
import PropTypes from "prop-types";
import { Box, CardMedia } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledImageContainer = styled(Box)({
  position: "relative",
  "&:before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(36, 36, 36, 0.25) 100%)",
    borderRadius: "12px",
  },
});

const StyledPlayerImage = styled(CardMedia)(({ theme, height = "250px", isPlaceholder }) => ({
  width: "100%",
  height,
  objectFit: "cover",
  backgroundPosition: "center",
  borderRadius: isPlaceholder ? "20px" : "12px",
  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
  [theme.breakpoints.up("lg")]: {
    height: height === "250px" ? "225px" : height,
  },
}));

const PlayerImage = ({ src, alt, placeholderSrc, height = "250px", showGradient = true, ...rest }) => {
  const ImageComponent = <StyledPlayerImage component="img" src={src || placeholderSrc} alt={alt} height={height} isPlaceholder={!src} {...rest} />;

  if (showGradient) {
    return <StyledImageContainer>{ImageComponent}</StyledImageContainer>;
  }

  return ImageComponent;
};

PlayerImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string.isRequired,
  placeholderSrc: PropTypes.string,
  height: PropTypes.string,
  showGradient: PropTypes.bool,
};

export default PlayerImage;
