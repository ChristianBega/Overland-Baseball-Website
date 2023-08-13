import React from "react";
import { newsData } from "../../websiteData/home.data";
import { Grid, Typography, Box } from "@mui/material";
import { useTheme } from "@emotion/react";

import Socials from "../reusableComponents/socials.component";

export default function News() {
  const theme = useTheme();
  return (
    <Grid item xs={12} md={8} lg={6} sx={{ position: "relative", mt: { lg: 10 } }}>
      <Box sx={{ minHeight: { xs: "300px", md: "400px" }, p: 4, textAlign: "center" }}>
        <Typography sx={{ my: 5, color: theme.palette.primary.main }} typography="h2Small">
          Trail Blazer News
        </Typography>
        {newsData.map(({ news }) => {
          return <Typography typography={{ xs: "bodyTextSm", md: "bodyTextLg" }}>{news}</Typography>;
        })}
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 8 }}>
          <Socials />
        </Box>
      </Box>
    </Grid>
  );
}
