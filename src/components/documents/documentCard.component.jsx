import { Grid } from "@mui/material";
import React from "react";

export default function DocumentCard({ data }) {
  return (
    <Grid item xs={6}>
      <h1>{data.documentType }</h1>
      <p>{data.documentName}</p>
    </Grid>
  );
}
