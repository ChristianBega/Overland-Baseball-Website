import React from "react";
import TimeLine from "../components/Timeline";
import { motion } from "framer-motion";
import { containerVariants } from "../../../setup/framerAnimations/transitions";
import { Container } from "@mui/material";
export default function AlumniPage() {
  return (
    <Container
      // component={motion.section}
      initial={containerVariants.hidden}
      animate={containerVariants.visible}
      exit={containerVariants.exit}
      transition={containerVariants.transition}
      id="alumni-page"
      component="main"
      aria-label="Alumni Page"
    >
      <TimeLine />
    </Container>
  );
}
