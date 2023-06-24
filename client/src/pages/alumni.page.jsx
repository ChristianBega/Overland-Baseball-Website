import React, { useEffect } from "react";
import TimeLine from "../components/alumni/TimeLine";
import { motion } from "framer-motion";
import { containerVariants } from "../components/framerMotion/transitions";
import { Container } from "@mui/material";
export default function AlumniPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Container
      component={motion.section}
      initial={containerVariants.hidden}
      animate={containerVariants.visible}
      exit={containerVariants.exit}
      transition={containerVariants.transition}
    >
      <TimeLine />
    </Container>
  );
}
