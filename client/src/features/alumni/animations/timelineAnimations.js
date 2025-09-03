// Timeline-specific Framer Motion animations
export const timelineAnimations = {
  // Container animation for staggered children
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  },

  // Individual timeline item animation
  item: {
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
  },

  // Year header badge animation
  yearHeader: {
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
  },

  // Progress indicator animations
  progressIndicator: {
    initial: { scale: 0, rotate: -180 },
    animate: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
        delay: 0.3,
        ease: "backOut",
      },
    },
  },

  // Progress bar fill animation (for inline use)
  progressFill: {
    type: "tween",
    ease: "easeInOut",
    duration: 0.6,
  },
};
