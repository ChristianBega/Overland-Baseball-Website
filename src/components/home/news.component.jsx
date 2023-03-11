import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function News() {
  return (
    <Grid item xs={12} md={8} lg={7}>
      <Typography textAlign="center" typography={{ xs: "h3", md: "h2" }}>
        Trail Blazer News
      </Typography>
      <Box sx={{ bgcolor: "red", minHeight: { xs: "250px", md: "350px" } }} typography={{ xs: "bodyTextSm", md: "bodyTextLg" }}>
        Lorem ipsum odor amet, consectetuer adipiscing elit. Morbi purus dapibus; massa sed imperdiet turpis metus cursus. Felis quisque taciti
        suscipit facilisi litora mollis viverra. Non taciti pellentesque id elit nostra, quisque proin mattis? Senectus per vulputate dignissim
        parturient id rhoncus orci. Consequat neque dui inceptos gravida aliquam. Viverra per ultricies leo laoreet libero platea commodo.
      </Box>
    </Grid>
  );
}
