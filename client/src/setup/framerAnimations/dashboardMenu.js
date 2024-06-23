export const containerVariants = {
  open: {
    height: "100%",
    maxHeight: "400px",
    y: 0,
    opacity: 1,
    transition: { easeInOut: [0.43, 0.13, 0.23, 0.96], duration: 0.6, stiffness: 90, mass: 0.5, damping: 10, type: "spring" },
  },
  closed: {
    opacity: 0,
    height: 0,
    transition: { easeInOut: [0.43, 0.13, 0.23, 0.96], duration: 0.6, stiffness: 90, mass: 0.5, damping: 10, type: "spring" },
  },
};

export const itemVariants = {
  initial: { opacity: 1, backgroundColor: "transparent" },
  hover: {
    opacity: 1,
    backgroundColor: "#007f3b",
    transition: { easeInOut: [0.43, 0.13, 0.23, 0.96], duration: 0.6, stiffness: 90, mass: 0.5, damping: 10, type: "spring" },
  },
  tap: {
    opacity: 1,
    backgroundColor: "#21c067",
    transition: { easeInOut: [0.43, 0.13, 0.23, 0.96], duration: 0.6, stiffness: 90, mass: 0.5, damping: 10, type: "spring" },
  },
  faded: { opacity: 0.5, transition: { duration: 0.3 } },
};
