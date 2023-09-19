import { Grid, Typography } from "@mui/material";
import React from "react";

export default function TextComponent({ boosterData, isMobile }) {
  return (
    <>
      <Grid item xs={12} md={8} sx={{ padding: { xs: 0, md: 8 } }}>
        {!isMobile && <Typography typography="h2">{boosterData.title}</Typography>}
        <Typography sx={{ minHeight: "300px" }} typography={{ xs: "smallBodyText", md: "largeBodyText" }}>
          {boosterData.content}
        </Typography>
      </Grid>
    </>
  );
}
