import { Container, Grid, Typography, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import DocumentsGrid from "../components/documents/documentGrid.component";
import { playerDocuments } from "../websiteData/documents/documents.data";

export default function DocumentsPage() {
  const theme = useTheme();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Container component="section" id="documents-section" style={{ display: "flex", justifyContent: " center", marginBlock: theme.spacing(5) }}>
      <Grid id="main-grid" container maxWidth="xl" spacing={{ xs: 4, md: 6 }} sx={{ justifyContent: " center", mt: { xs: 5, sm: 10 } }} my={10}>
        <Typography typography="h2" my={10} color={theme.palette.primary.main}>
          Documents
        </Typography>
        <DocumentsGrid documentsData={playerDocuments} />
        {/* <DocumentsGrid /> */}
        {/* <DocumentsGrid /> */}
      </Grid>
    </Container>
  );
}
