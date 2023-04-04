import { Grid } from "@mui/material";
import React from "react";
import DocumentCard from "./documentCard.component";

export default function DocumentsGrid({ documentsData }) {
  return (
    <Grid item id="main-grid-item" xs={12} sx={{ display: "flex", justifyContent: "center" }}>
      <Grid id="document-grid-container" container maxWidth="sm" spacing={4} sx={{ display: "flex", flexWrap: "wrap" }}>
        {documentsData.map((document, index) => (
          <DocumentCard data={document} index={index} key={document.documentName} />
        ))}
      </Grid>
    </Grid>
  );
}
