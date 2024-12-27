import React from "react";
// MUI components
import { Box, Grid, IconButton, Link, Typography, useTheme } from "@mui/material";
import { Stack } from "@mui/system";
// Icons
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
// import YouTubeIcon from "@mui/icons-material/YouTube";
import styled from "@emotion/styled";
// Images
import OverlandLogo from "../../assets/overlandLogo_3.webp";
import useMediaQueries from "../../setup/utils/helpers/useMediaQueries.utils";
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
  // {
  //   linkName: "youtube",
  //   linkUrl: "youtube.com",
  //   socialIcon: <YouTubeIcon />,
  // },
];
// const SocialLink = styled(Link)(({ theme }) => ({
//   "&:hover": {
//     cursor: "pointer",
//     scale: "1.3",
//     transition: ".3s all ease-in-out",
//     // color: theme.palette.secondary.light,
//     boxShadow: 10,
//   },
// }));

export default function Socials({ dataTypeDevice }) {
  const theme = useTheme();
  const { isSm, isMd } = useMediaQueries();
  return (
    <>
      {dataTypeDevice === "mobile" && (
        <Box sx={{ my: 20 }}>
          <Typography typography="h5" textAlign="center">
            Follow us
          </Typography>
          <Stack sx={{ justifyContent: "center", position: "relative" }} direction="row" spacing={2} mt={4}>
            {socialData.map((social) => (
              <IconButton
                component="a"
                sx={{ color: theme.palette.accent.accentOne }}
                key={social.linkName}
                href={`https://${social.linkUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.socialIcon}
              </IconButton>
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
        <Grid item xs={12} md={4} order={isMd ? 1 : 2}>
          <Typography component="h2" variant="h4" textAlign="center" fontWeight="bold" mb={1}>
            Follow us
          </Typography>
          <Stack direction="row" spacing={1} justifyContent="center">
            {socialData.map((social) => (
              <IconButton
                size={isSm ? "large" : "medium"}
                component="a"
                key={social.linkName}
                href={`https://${social.linkUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: theme.palette.secondary.main }}
              >
                {social.socialIcon}
              </IconButton>
            ))}

            {/* <Box
              component="img"
              src={OverlandLogo}
              sx={{ zIndex: "-100", opacity: ".2", minWidth: "300px", position: "absolute", top: "-95px" }}
            ></Box> */}
          </Stack>
        </Grid>
      )}
      {!dataTypeDevice && (
        <Box sx={{ my: 10 }}>
          <Typography sx={{ color: theme.palette.primary.light }} typography="h5" textAlign="center">
            Follow us
          </Typography>
          <Stack sx={{ justifyContent: "center", position: "relative" }} direction="row" spacing={2} mt={4}>
            {socialData.map((social) => (
              <IconButton
                component="a"
                sx={{ color: theme.palette.accent.accentOne }}
                key={social.linkName}
                href={`https://${social.linkUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.socialIcon}
              </IconButton>
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
