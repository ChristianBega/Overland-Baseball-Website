import React from "react";
// MUI components
import { Box, Link, Typography, useTheme } from "@mui/material";
import { Stack } from "@mui/system";
// Icons
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import styled from "@emotion/styled";
// Images
import OverlandLogo from "../../assets/overlandLogo_3.png";
const socialData = [
  {
    linkName: "twitter",
    linkUrl: "twitter.com/overlandbb",
    socialIcon: <TwitterIcon />,
  },
  {
    linkName: "facebook",
    linkUrl: "facebook.com/overlandathletics",
    socialIcon: <FacebookIcon />,
  },
  {
    linkName: "instagram",
    linkUrl: "www.instagram.com/overland.baseball/",
    socialIcon: <InstagramIcon />,
  },
  {
    linkName: "youtube",
    linkUrl: "youtube.com",
    socialIcon: <YouTubeIcon />,
  },
];
const SocialLink = styled(Link)(({ theme }) => ({
  "&:hover": {
    cursor: "pointer",
    scale: "1.3",
    transition: ".3s all ease-in-out",
    color: theme.palette.secondary.light,
    boxShadow: 10,
  },
}));

export default function Socials({ dataTypeDevice }) {
  const theme = useTheme();
  return (
    <>
      {dataTypeDevice === "mobile" && (
        <Box sx={{ my: 20 }}>
          <Typography sx={{ color: theme.palette.primary.light }} typography="h5" textAlign="center">
            Follow us
          </Typography>
          <Stack sx={{ justifyContent: "center", position: "relative" }} direction="row" spacing={2} mt={4}>
            {socialData.map((social) => (
              <SocialLink
                sx={{ color: theme.palette.accent.accentOne }}
                key={social.linkName}
                href={`https://${social.linkUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.socialIcon}
              </SocialLink>
            ))}

            <Box
              component="img"
              src={OverlandLogo}
              sx={{ zIndex: "-100", opacity: ".2", minWidth: "300px", position: "absolute", top: "-95px" }}
            ></Box>
          </Stack>
        </Box>
      )}
      {dataTypeDevice === "footer" && (
        <Box sx={{ mt: 0 }}>
          <Typography sx={{ color: theme.palette.text.primary }} typography="h5" textAlign="center">
            Follow us
          </Typography>
          <Stack sx={{ justifyContent: "center", position: "relative" }} direction="row" spacing={2} mt={4}>
            {socialData.map((social) => (
              <SocialLink
                sx={{ color: theme.palette.secondary.main }}
                key={social.linkName}
                href={`https://${social.linkUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.socialIcon}
              </SocialLink>
            ))}

            <Box
              component="img"
              src={OverlandLogo}
              sx={{ zIndex: "-100", opacity: ".2", minWidth: "300px", position: "absolute", top: "-95px" }}
            ></Box>
          </Stack>
        </Box>
      )}
      {!dataTypeDevice && (
        <Box sx={{ my: 10 }}>
          <Typography sx={{ color: theme.palette.primary.light }} typography="h5" textAlign="center">
            Follow us
          </Typography>
          <Stack sx={{ justifyContent: "center", position: "relative" }} direction="row" spacing={2} mt={4}>
            {socialData.map((social) => (
              <SocialLink
                sx={{ color: theme.palette.accent.accentOne }}
                key={social.linkName}
                href={`https://${social.linkUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.socialIcon}
              </SocialLink>
            ))}
            <Box
              component="img"
              src={OverlandLogo}
              sx={{ zIndex: "-100", opacity: ".2", minWidth: "300px", position: "absolute", top: "-95px" }}
            ></Box>
          </Stack>
        </Box>
      )}
    </>
  );
}
