import React from "react";
import { Grid } from "@mui/material";
import StaffItem from "./staffItem.component";

export default function Staff() {
  return (
    <>
      <Grid item xs={12}>
        <StaffItem />
      </Grid>
    </>
  );
}
