import React, { useRef } from "react";
import { Box } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import GameCard from "./GameCard";
import {
  StyledSliderContainer,
  StyledSliderWrapper,
  StyledLeftButton,
  StyledRightButton,
  StyledScrollHint,
} from "./ScheduleSlider.styles";

const ScheduleSlider = ({ games, showNavigation = true, showScrollHint = true }) => {
  const sliderRef = useRef(null);
  const isMouseDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Mouse scroll functionality
  const handleMouseDown = (e) => {
    if (!sliderRef.current) return;
    isMouseDown.current = true;
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
    sliderRef.current.style.cursor = "grabbing";
  };

  const handleMouseLeave = () => {
    isMouseDown.current = false;
    if (sliderRef.current) {
      sliderRef.current.style.cursor = "grab";
    }
  };

  const handleMouseUp = () => {
    isMouseDown.current = false;
    if (sliderRef.current) {
      sliderRef.current.style.cursor = "grab";
    }
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown.current || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  // Button scroll functionality
  const scrollLeftButton = () => {
    if (sliderRef.current) {
      const cardWidth = 366;
      sliderRef.current.scrollBy({
        left: -cardWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRightButton = () => {
    if (sliderRef.current) {
      const cardWidth = 366;
      sliderRef.current.scrollBy({
        left: cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box>
      <StyledSliderContainer>
        {/* Navigation Buttons - ONLY visible on large screens (≥1200px) */}
        {showNavigation && (
          <>
            <StyledLeftButton onClick={scrollLeftButton} aria-label="Previous games">
              <ChevronLeftIcon />
            </StyledLeftButton>
            <StyledRightButton onClick={scrollRightButton} aria-label="Next games">
              <ChevronRightIcon />
            </StyledRightButton>
          </>
        )}

        <StyledSliderWrapper
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {games.map((game, index) => (
            <GameCard key={game.id || `game-${index}`} data={game} />
          ))}
        </StyledSliderWrapper>
      </StyledSliderContainer>

      {/* Scroll Hint - ONLY visible on small/medium screens (<1200px) */}
      {showScrollHint && (
        <StyledScrollHint>
          <span className="arrow">←</span>
          <span>Scroll to view more games</span>
          <span className="arrow">→</span>
        </StyledScrollHint>
      )}
    </Box>
  );
};

export default ScheduleSlider;
