import React from "react";

import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

// Icons
// import EmailIcon from "@mui/icons-material/Email";
import OverlandLogo from "../../assets/overlandLogo_3.png";

// Components
import Socials from "../reusableComponents/socials.component";
import { useTheme } from "@emotion/react";

const newsData = {
  news: "We are developing players who are often overlooked…. who just need to be looked over. Trailblazers Baseball training is expanding rapidly. We put major focus on fundamentals, minor changes and create player improvement. Our Program is perfectly developed for ages 13-18yrs old Trailblazer teams will participate in the Colorado Classic Summer League & 5Tool showcases. Developmental team (RBI), Legion. Trailblazers Baseball aiming for Regional and State titles.",
};
export default function News() {
  const theme = useTheme();
  return (
    <Grid item xs={12} md={6} lg={6} sx={{ position: "relative", mt: { lg: 10 } }}>
      <Box sx={{ minHeight: { xs: "300px", md: "400px", textAlign: "center" }, p: 4 }}>
        <Typography sx={{ my: 5, color: theme.palette.primary.main }} typography="h2Small">
          Trail Blazer News
        </Typography>
        <Typography typography={{ xs: "bodyTextSm", md: "bodyTextLg" }}>{newsData.news}</Typography>
        {/* <Box
          component="img"
          src={OverlandLogo}
          sx={{ zIndex: "-100", opacity: ".3", maxWidth: "350px", position: "absolute", top: "50%", left: "50%", translate : "transform(-50%,-50%)" }}
        ></Box> */}

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 8 }}>
          <Socials />
        </Box>
      </Box>
    </Grid>
  );
}
