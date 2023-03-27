import React from "react";

import { Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";

// Icons
import EmailIcon from "@mui/icons-material/Email";

// Components
import Socials from "../reusableComponents/socials.component";

const newsData = {
  news: "We are developing players who are often overlooked…. who just need to be looked over. Trailblazers Baseball training is expanding rapidly. We put major focus on fundamentals, minor changes and create player improvement. Our Program is perfectly developed for ages 13-18yrs old Trailblazer teams will participate in the Colorado Classic Summer League & 5Tool showcases. Developmental team (RBI), Legion. Trailblazers Baseball aiming for Regional and State titles.",
  coaches: "Steve Gonzales, Adrian Tofoya, Mike Bega",
  contactOne: "Steve Gonzales: g5coloradobaseball@gmail.com",
  contactTwo: "Mike Bega: mbega@cherrycreekschools.org ",
};
export default function News() {
  return (
    <Grid item xs={12} md={8} lg={7}>
      <Box sx={{ minHeight: { xs: "300px", md: "400px", textAlign : "center" }, p: 4 }}>
        <Typography sx={{ textAlign: "center", my: 5 }} typography={{ xs: "h3", md: "h2" }}>
          Trail Blazer News
        </Typography>
        <Stack direction="column" spacing={4}>
          <Typography typography={{ xs: "bodyTextSm", md: "bodyTextLg" }}>{newsData.news}</Typography>
          <Typography typography={{ xs: "bodyTextSm", md: "bodyTextLg" }}>Coaches: {newsData.coaches}</Typography>

          {/* line 29-38 needs to be refactored and map over data to create stack */}
          <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
            <EmailIcon />
            <Typography typography={{ xs: "bodyTextSm", md: "bodyTextLg" }}>{newsData.contactOne}</Typography>
          </Stack>
          <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
            <EmailIcon />
            <Typography typography={{ xs: "bodyTextSm", md: "bodyTextLg" }}>{newsData.contactTwo}</Typography>
          </Stack>
        </Stack>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 8 }}>
          <Socials />
        </Box>
      </Box>
    </Grid>
  );
}
