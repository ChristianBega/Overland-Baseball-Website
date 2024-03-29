import { Grid } from "@mui/material";
import React from "react";

export default function Copyright() {
  return (
    <>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", mt: 5, textAlign: "center" }}>
        © 2023 Overland Baseball, All Rights Reserved
      </Grid>
    </>
  );
}
