import { Link as RouterLink } from "react-router-dom";
// MUI components
import { Box, Stack, Typography, Link } from "@mui/material";
// Image assets
import logo from "../../../assets/overlandLogo_3.webp";
// Utils & Helpers
import { useTheme } from "@emotion/react";

export default function LogoFooter({ textColor, noHover }) {
  const theme = useTheme();
  return (
    // <Grid item xs={12}>
    <Link
      component={RouterLink}
      to="/"
      sx={
        noHover && {
          "&:hover": {
            cursor: "default",
            color: "transparent",
            filter: "none",
            "& svg": {
              filter: "none",
            },
          },
        }
      }
    >
      <Stack alignItems="center" sx={{ width: "250px", margin: "0 auto" }}>
        <Box component="img" sx={{ height: "85px", width: "135px", margin: "0 auto" }} src={logo}></Box>
        <Typography
          textColor={textColor}
          component="p"
          sx={{
            color: textColor ? textColor : theme.palette.text.secondary,
            width: "250px",
            display: "block",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          The Official Site of The <br />
          <Typography component="p" color="secondary">
            Overland Trail Blazers
          </Typography>
        </Typography>
      </Stack>
    </Link>
    // </Grid>
  );
}
