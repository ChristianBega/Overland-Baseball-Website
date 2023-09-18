import { Container, Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";
import { containerVariants } from "./pageAnimationsFramerMotion/transitions";
import DocumentsGrid from "../components/documents/documentGrid.component";
import { playerDocuments } from "../websiteData/documents/documents.data";

export default function DocumentsPage() {
  const theme = useTheme();
  return (
    <Container
      component={motion.section}
      initial={containerVariants.hidden}
      animate={containerVariants.visible}
      exit={containerVariants.exit}
      transition={containerVariants.transition}
      id="documents-section"
      style={{ display: "flex", justifyContent: " center", marginBlock: theme.spacing(5) }}
    >
      <Grid id="main-grid" container maxWidth="xl" spacing={{ xs: 4, md: 6 }} sx={{ justifyContent: " center" }}>
        <Typography typography="h1" component="h1">
          Documents
        </Typography>
        <DocumentsGrid documentsData={playerDocuments} />
        {/* <DocumentsGrid /> */}
        {/* <DocumentsGrid /> */}
      </Grid>
    </Container>
  );
}
