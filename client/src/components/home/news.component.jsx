import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Socials from "../reusableComponents/socials.component";

export default function News() {
  return (
    <Grid item xs={12} md={8} lg={7}>
      <Box sx={{ minHeight: { xs: "300px", md: "400px" }, textAlign: "center", p: 4 }}>
        <Typography sx={{ textAlign: "center", my: 5 }} typography={{ xs: "h3", md: "h2" }}>
          Trail Blazer News
        </Typography>
        <Typography typography={{ xs: "bodyTextSm", md: "bodyTextLg" }}>
          Lorem ipsum odor amet, consectetuer adipiscing elit. Morbi purus dapibus; massa sed imperdiet turpis metus cursus. Felis quisque taciti
          suscipit facilisi litora mollis viverra. Non taciti pellentesque id elit nostra, quisque proin mattis? Senectus per vulputate dignissim
          parturient id rhoncus orci. Consequat neque dui inceptos gravida aliquam. Viverra per ultricies leo laoreet libero platea commodo.
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 8 }}>
          <Socials />
        </Box>
      </Box>
    </Grid>
  );
}
