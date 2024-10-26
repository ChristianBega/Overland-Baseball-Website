import { Container, Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";
import { containerVariants } from "../../../setup/framerAnimations/transitions";
import { playerDocuments } from "../../../websiteData/documents/documents.data";
import { useRealtimeData } from "../../../hooks/useRealtimeData";
import DocumentCard from "./components/documentCard/documentCard.component";
export default function DocumentsPage() {
  const { data, isLoading, error } = useRealtimeData("documents");
  const theme = useTheme();
  //! update this status with our custom status component
  if (isLoading) {
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>Loading...</div>;
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Typography variant="h6" color="error">
          {error ? "Error with real-time updates" : "Error fetching/caching the data"}
        </Typography>
      </div>
    );
  }

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
      <Grid
        id="main-grid"
        container
        maxWidth="xl"
        spacing={{ xs: 4, md: 6 }}
        sx={{ justifyContent: " center", display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <div>
          <Typography typography="h1" component="h1">
            Documents
          </Typography>
        </div>
        <div>
          {data.map((document, index) => (
            <DocumentCard key={index} data={document} isCard={true} />
          ))}
        </div>
        {/* <DocumentsGrid /> */}
      </Grid>
    </Container>
  );
}
