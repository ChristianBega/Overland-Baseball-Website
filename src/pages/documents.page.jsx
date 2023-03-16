import { Grid } from "@mui/material";
import React from "react";
import DocumentsGrid from "../components/documents/documentGrid.component";

export default function DocumentsPage() {
  return (
    <section id="documents-section" style={{ display: "flex", justifyContent: " center" }}>
      <Grid container maxWidth="lg" spacing={{ xs: 4, md: 6 }}>
        <DocumentsGrid />
        <DocumentsGrid />
        <DocumentsGrid />
      </Grid>
    </section>
  );
}
