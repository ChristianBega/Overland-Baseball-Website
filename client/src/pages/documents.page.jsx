import { Container, Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import DocumentsGrid from "../components/documents/documentGrid.component";
import { playerDocuments } from "../websiteData/documents/documents.data";

export default function DocumentsPage() {
  const theme = useTheme();
  return (
    <Container component="section" id="documents-section" style={{ display: "flex", justifyContent: " center", marginBlock: theme.spacing(5) }}>
      <Grid id="main-grid" container maxWidth="xl" spacing={{ xs: 4, md: 6 }} sx={{ justifyContent: " center" }} my={10}>
        <Typography typography="h1" my={10} color={theme.palette.secondary.main}>
          Documents
        </Typography>
        <DocumentsGrid documentsData={playerDocuments} />
        {/* <DocumentsGrid /> */}
        {/* <DocumentsGrid /> */}
      </Grid>
    </Container>
  );
}
