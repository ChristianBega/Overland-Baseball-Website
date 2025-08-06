import React from "react";
import TimeLine from "../components/Timeline";
import { motion } from "framer-motion";
import { containerVariants } from "../../../utils/animations/transitions";
import { Container } from "@mui/material";
import { Navigation } from "../../navigation";
export default function AlumniPage() {
  return (
    <>
      <Navigation />
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
    </>
  );
}
