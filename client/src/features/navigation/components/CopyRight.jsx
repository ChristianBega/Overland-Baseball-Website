import { Grid } from "@mui/material";
import React from "react";
const styles = {
  copyrightContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: 2,
    textAlign: "center",
  },
};
export default function Copyright() {
  return (
    <Grid item xs={12} sx={styles.copyrightContainer}>
      © 2023 Overland Baseball, All Rights Reserved
    </Grid>
  );
}
