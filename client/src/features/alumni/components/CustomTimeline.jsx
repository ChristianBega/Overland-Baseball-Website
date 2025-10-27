import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";

import TimelineProgressBar from "./TimelineProgressBar";
import { TimelineContainer, TimelineItemContainer, TimelineContent, YearHeader } from "./CustomTimeline.styles";
import { timelineAnimations } from "../animations/timelineAnimations";
import AlumniCard from "./AlumniCard";

const CustomTimeline = ({ items, groupByYear = true }) => {
  const timelineRef = useRef(null);

  // Group items by year if needed
  const groupedItems = groupByYear
    ? items.reduce((acc, item) => {
        const year = item.statsYear || "Unknown";
        if (!acc[year]) acc[year] = [];
        acc[year].push(item);
        return acc;
      }, {})
    : { "All": items };

  // Extract animation variants from animations file
  const { container: containerVariants, item: itemVariants, yearHeader: yearHeaderVariants } = timelineAnimations;

  let itemIndex = 0;

  return (
    <TimelineContainer ref={timelineRef}>
      <TimelineProgressBar itemCount={items.length} containerRef={timelineRef} />

      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
        {Object.entries(groupedItems)
          .sort(([a], [b]) => {
            // Sort years in ascending order (oldest first)
            if (a === "Unknown") return 1;
            if (b === "Unknown") return -1;
            return parseInt(a) - parseInt(b);
          })
          .map(([year, yearItems]) => (
            <motion.div key={year} variants={itemVariants}>
              {/* Year Header - Only show once per year */}
              {groupByYear && year !== "All" && (
                <YearHeader as={motion.div} variants={yearHeaderVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <Typography className="year-badge" component="h2" variant="h2">
                    {year}
                  </Typography>
                </YearHeader>
              )}

              {/* Timeline Items */}
              {yearItems.map((item, index) => {
                const isLeft = itemIndex % 2 === 0;
                itemIndex++;

                return (
                  <TimelineItemContainer
                    key={`${item.name}-${index}`}
                    isLeft={isLeft}
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    <TimelineContent variants={itemVariants}>
                      <AlumniCard key={`${item.name}-${index}`} alumni={item} />
                    </TimelineContent>
                  </TimelineItemContainer>
                );
              })}
            </motion.div>
          ))}
      </motion.div>
    </TimelineContainer>
  );
};

CustomTimeline.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      playerName: PropTypes.string.isRequired,
      statsYear: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
  groupByYear: PropTypes.bool,
};

export default CustomTimeline;
