import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { ProgressBarContainer, ProgressBarTrack, ProgressBarFill, ProgressIndicator } from "./TimelineProgressBar.styles";

const TimelineProgressBar = ({ itemCount, containerRef }) => {
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
    <ProgressBarContainer>
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
        style={{ top: progress === 1 ? "99.8%" : `${indicatorPosition * 90}%` }}
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
