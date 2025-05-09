import React from "react";
// MUI components
import { Box, Grid, Typography, Link } from "@mui/material";
import { useTheme } from "@emotion/react";
// Utils
import useMediaQueries from "../../../utils/helpers/useMediaQueries.utils";

const styles = {
  typography: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 1,
  },
  box: {
    display: "flex",
    justifyContent: "center",
  },
  iframe: {
    border: "0",
    position: "relative",
    width: "275px",
    height: "200px",
  },
  link: (theme) => ({
    border: `1px solid ${theme.palette.borders.primary}`,
    position: "absolute",
    width: "275px",
    height: "200px",
    textIndent: "-9999px",
  }),
};

export default function LocationMap() {
  const { isMd } = useMediaQueries();
  const theme = useTheme();

  return (
    <Grid item xs={12} md={4} order={isMd ? 2 : 3}>
      <Typography component="h2" variant="h4" sx={styles.typography}>
        Location
      </Typography>
      <Box sx={styles.box}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d806.0333543526149!2d-104.84414943550574!3d39.682822188705124!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sus!4v1679347895928!5m2!1sen!2sus"
          title="map"
          loading="lazy"
          style={styles.iframe}
        ></iframe>
        <Link
          href="https://www.google.com/maps/dir/?api=1&destination=39.682822188705124,-104.84414943550574"
          target="_blank"
          rel="noopener noreferrer"
          sx={styles.link(theme)}
        >
          Click to open directions
        </Link>
      </Box>
    </Grid>
  );
}
