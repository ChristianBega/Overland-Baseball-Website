import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import useMediaQueries from "../../../utils/helpers/useMediaQueries.utils";

const ProgressBarContainer = styled(Box)(({ theme, isMobile }) => ({
  position: "absolute",
  left: "50%",
  top: 0,
  bottom: 0,
  width: isMobile ? "8px" : "12px", // Much thicker
  transform: "translateX(-50%)",
  zIndex: 0, // Behind cards
}));

const ProgressBarTrack = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  bottom: 0,
  width: "100%",
  backgroundColor: theme.palette.grey[300], // Gray background track
  borderRadius: "6px", // More rounded
  boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)", // Subtle inset shadow
}));

const ProgressBarFill = styled(motion.div)(({ theme, progress }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  // height: "calc(100% - 200px)", // Leave 40px space at bottom for visibility
  borderRadius: "6px",
  transformOrigin: "top", // Scale from top down
  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  background: theme.palette.gradients.primaryToTop,
  // background: `linear-gradient(to bottom,
  //   ${theme.palette.primary.main} 0%,
  //   ${theme.palette.primary.dark} 100%)`,
  ...(progress <= 0.99 && {
    height: "90%",
  }),
  ...(progress === 1 && {
    height: "100%",
  }),
}));

const ProgressIndicator = styled(motion.div)(({ theme, isMobile }) => ({
  position: "absolute",
  width: isMobile ? "20px" : "24px", // Much bigger
  height: isMobile ? "20px" : "24px",
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.main,
  border: `3px solid ${theme.palette.background.paper}`,
  boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 2,
  "&::before": {
    content: '""',
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "50%",
    height: "50%",
    borderRadius: "50%",
    backgroundColor: theme.palette.primary.light,
    transform: "translate(-50%, -50%)",
  },
}));

const TimelineProgressBar = ({ itemCount, containerRef }) => {
  const { isMobile } = useMediaQueries();
  const [progress, setProgress] = useState(0);
  const [indicatorPosition, setIndicatorPosition] = useState(0);

  useEffect(() => {
    if (!containerRef?.current) return;

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate scroll progress
      const containerTop = containerRect.top;
      const containerHeight = containerRect.height;

      const scrollStart = -containerHeight + viewportHeight;
      const scrollEnd = viewportHeight;
      const scrollRange = scrollEnd - scrollStart;

      let scrollProgress = 0;
      if (containerTop <= scrollEnd && containerTop >= scrollStart) {
        scrollProgress = (scrollEnd - containerTop) / scrollRange;
      } else if (containerTop < scrollStart) {
        scrollProgress = 1;
      }

      scrollProgress = Math.max(0, Math.min(1, scrollProgress));
      setProgress(scrollProgress);

      // Sync indicator position with fill progress
      // The dot should follow the exact same progress as the fill
      setIndicatorPosition(scrollProgress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [itemCount, containerRef]);

  return (
    <ProgressBarContainer isMobile={isMobile}>
      <ProgressBarTrack progress={progress} />
      <ProgressBarFill
        progress={progress}
        style={{ scaleY: progress }}
        transition={{
          type: "tween",
          ease: "easeInOut",
          duration: 0.6,
        }}
      />
      <ProgressIndicator
        isMobile={isMobile}
        // if progress is 1, then set the top to 100%
        style={{ top: progress === 1 ? "99.8%" : `${indicatorPosition * 90}%` }}
        // style={{ top: `${indicatorPosition * 90}%` }}
        transition={{
          type: "tween",
          ease: "easeInOut",
          duration: 0.6,
        }}
      />
    </ProgressBarContainer>
  );
};

TimelineProgressBar.propTypes = {
  itemCount: PropTypes.number.isRequired,
  containerRef: PropTypes.object.isRequired,
};

export default TimelineProgressBar;
