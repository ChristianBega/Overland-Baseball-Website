import { Grid, Typography } from "@mui/material";
import React from "react";

export default function DocumentCard({ data }) {
  return (
    <Grid id="document-grid-item" item xs={6} sx={{ textAlign: "center", minHeight: "248px", width : "100%" }}>
      {/* <Typography typography="h4">{data.documentType}</Typography> */}

      <Typography typography="bodyTextSm">{data.documentName}</Typography>
    </Grid>
  );
}
