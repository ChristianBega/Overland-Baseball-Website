import { Grid } from "@mui/material";
import React from "react";
import DocumentCard from "./documentCard.component";

const documentsData = [
  {
    documentName: "doc name #1",
    documentLink: "url link",
    documentType: "doc type ",
  },
  {
    documentName: "doc name #2",
    documentLink: "url link",
    documentType: "doc type player ",
  },
  {
    documentName: "doc name #3",
    documentLink: "url link",
    documentType: "doc type coach ",
  },
  {
    documentName: "doc name #4",
    documentLink: "url link",
    documentType: "doc type parent",
  },
];
export default function DocumentsGrid() {
  return (
    <Grid item id="main-grid-item" xs={12} md={6} sx={{ display: "flex", justifyContent: "center" }}>
      <Grid id="document-grid-container" container maxWidth="sm" spacing={{ xs: 2, md: 4 }} sx={{ display: "flex", flexWrap: "wrap" }}>
        {/* <section id="documents-sub-grids" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          </section> */}
        {documentsData.map((document) => (
          <DocumentCard data={document} key={document.documentName} />
        ))}
      </Grid>
    </Grid>
  );
}
