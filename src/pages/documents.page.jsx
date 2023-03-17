import { Grid, useTheme } from "@mui/material";
import React from "react";
import DocumentsGrid from "../components/documents/documentGrid.component";

export default function DocumentsPage() {
  const theme = useTheme()
  return (
    <section id="documents-section" style={{ display: "flex", justifyContent: " center", marginBlock : theme.spacing(5) }}>
      <Grid id="main-grid" container maxWidth="xl" spacing={{ xs: 4, md: 6 }}>
        <DocumentsGrid />
        <DocumentsGrid />
        <DocumentsGrid />
      </Grid>
    </section>
  );
}
