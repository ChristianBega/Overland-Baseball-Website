import { Link as RouterLink } from "react-router-dom";
// MUI components
import { Box, Grid, Stack, Typography, Link } from "@mui/material";
// Image assets
import logo from "../../../../assets/overlandLogo_3.webp";
const styles = {
  link: {
    color: (theme) => theme.palette.text.secondary,
    width: "250px",
    display: "block",
    margin: "0 auto",
  },
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

export default function LogoFooter() {
  return (
    <Grid item xs={12}>
      <Link component={RouterLink} to="/" sx={styles.link}>
        <Stack alignItems="center" sx={styles.stack}>
          <Box component="img" sx={styles.box} src={logo}></Box>
          <Typography component="p" sx={styles.typography}>
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
