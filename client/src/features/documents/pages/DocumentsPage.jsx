import { Container, Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";
import { containerVariants } from "../../../utils/animations/transitions";
import { Navigation } from "../../navigation";
export default function DocumentsPage() {
  // const { data, isLoading, error } = useRealtimeData("documents");
  const theme = useTheme();

  return (
    <>
      <Navigation />
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
            <p>Documents Coming Soon</p>
            {/* {data.map((document, index) => (
              <DocumentCard key={index} data={document} isCard={true} />
            ))} */}
          </div>
          {/* <DocumentsGrid /> */}
        </Grid>
      </Container>
    </>
  );
}
