import { Link as RouterLink } from "react-router-dom";
// MUI components
import { Box, Grid, Stack, Typography, Link } from "@mui/material";
// Image assets
import logo from "../../../../assets/overlandLogo_3.webp";
import { useTheme } from "@emotion/react";
const styles = {
  stack: {
    width: "250px",
    margin: "0 auto",
  },
  box: {
    height: "85px",
    width: "135px",
    margin: "0 auto",
  },
  typography: {
    textTransform: "uppercase",
  },
};

const noHoverStyles = {
  "&:hover": {
    cursor: "default",
    color: "transparent",
    filter: "none",
    "& svg": {
      filter: "none",
    },
  },
};

export default function LogoFooter({ textColor, noHover }) {
  const theme = useTheme();
  return (
    <Grid item xs={12}>
      <Link component={RouterLink} to="/" sx={noHover && noHoverStyles}>
        <Stack alignItems="center" sx={styles.stack}>
          <Box component="img" sx={styles.box} src={logo}></Box>
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
    </Grid>
  );
}
