import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import useMediaQueries from "../../../utils/helpers/useMediaQueries.utils";
// import baseballIcon from "../../../assets/baseball-icon.png";
import TimelineProgressBar from "./TimelineProgressBar";

const TimelineContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  // padding: theme.spacing(4, 0),
  maxWidth: "1200px",
  margin: "0 auto",
}));

const TimelineItemContainer = styled(motion.div)(({ theme, isMobile, isLeft }) => ({
  position: "relative",
  marginBottom: theme.spacing(6),
  width: "100%",
  [theme.breakpoints.up("md")]: {
    width: isMobile ? "100%" : "calc(50% - 20px)",
    marginLeft: !isMobile && isLeft ? "0" : !isMobile && !isLeft ? "calc(50% + 20px)" : "0",
  },
}));

// const TimelineIcon = styled(motion.div)(({ theme, isLeft }) => ({
//   position: "absolute",
//   left: isLeft ? "calc(100% + 20px)" : "-20px",
//   top: theme.spacing(2),
//   width: "32px",
//   height: "32px",
//   borderRadius: "50%",
//   backgroundColor: theme.palette.primary.main,
//   border: `3px solid ${theme.palette.background.paper}`,
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   transform: "translateX(-50%)",
//   zIndex: 3,
//   boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
//   "& img": {
//     width: "18px",
//     height: "18px",
//     filter: "brightness(0) invert(1)",
//   },
// }));

// Remove TimelineYear styled component since we're not using individual year badges anymore

const TimelineContent = styled(motion.div)(({ theme, isMobile }) => ({
  marginLeft: isMobile ? theme.spacing(8) : 0,
  marginTop: theme.spacing(1),
  [theme.breakpoints.up("md")]: {
    marginLeft: isMobile ? theme.spacing(8) : 0,
  },
}));

const YearHeader = styled(motion.div)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(4),
  position: "relative",
  zIndex: 2,
  "& .year-badge": {
    display: "inline-block",
    background: theme.palette.gradients.primary,
    border: `3px solid ${theme.palette.background.paper}`,
    // backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(1, 3),
    borderRadius: "25px",
    fontSize: "24px",
    fontWeight: "700",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },
}));

const CustomTimeline = ({ items, groupByYear = true }) => {
  const { isMobile } = useMediaQueries();
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // const iconVariants = {
  //   hidden: { scale: 0, rotate: -180 },
  //   visible: {
  //     scale: 1,
  //     rotate: 0,
  //     transition: {
  //       duration: 0.5,
  //       delay: 0.3,
  //       ease: "backOut",
  //     },
  //   },
  // };

  const yearHeaderVariants = {
    hidden: { opacity: 0, y: -30, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

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
                    key={`${item.playerName}-${index}`}
                    isMobile={isMobile}
                    isLeft={isLeft}
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    {/* Only show timeline icon on desktop */}
                    {/* {!isMobile && (
                      <TimelineIcon isLeft={isLeft} variants={iconVariants}>
                        <img src={baseballIcon} alt="Baseball icon" />
                      </TimelineIcon>
                    )} */}

                    <TimelineContent isMobile={isMobile} variants={itemVariants}>
                      {item.content}
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
