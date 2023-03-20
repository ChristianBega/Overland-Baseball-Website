import React from "react";
// MUI components
import { Grid, Link, Typography } from "@mui/material";
import { Stack } from "@mui/system";
// Icons
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

const socialData = [
  {
    linkName: "twitter",
    linkUrl: "twitter.com",
    socialIcon: <TwitterIcon />,
  },
  {
    linkName: "facebook",
    linkUrl: "facebook.com",
    socialIcon: <FacebookIcon />,
  },
  {
    linkName: "instagram",
    linkUrl: "instagram.com",
    socialIcon: <InstagramIcon />,
  },
  {
    linkName: "youtube",
    linkUrl: "youtube.com",
    socialIcon: <YouTubeIcon />,
  },
];
export default function Socials() {
  return (
    <Grid item xs={6} md={5} sx={{ display: "flex", flexDirection: "column", flexGrow: 1, alignItems: "center" }}>
      <Typography typography="h5">Follow us</Typography>
      <Stack direction="row" spacing={2} mt={4}>
        {socialData.map((social) => (
          <Link sx={{ color: "#fff" }} key={social.linkName} href={`https://${social.linkUrl}`} target="_blank" rel="noopener noreferrer">
            {social.socialIcon}
          </Link>
        ))}
      </Stack>
    </Grid>
  );
}
