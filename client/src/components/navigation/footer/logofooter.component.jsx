import { Link } from "react-router-dom";
// Image assets
import logo from "../../../assets/overlandLogo_3.webp";

import { Box, Grid, Typography } from "@mui/material";

export default function LogoFooter() {
  return (
    <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", mb: 10, textAlign: "center" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          columnGap: 4,
          borderRadius: "50%",
          cursor: "pointer",
        }}
      >
        <Link to="/">
          <Box
            component="img"
            sx={{
              height: "75px",
              width: "auto",
              "&:hover": {
                cursor: "pointer",
                scale: "1.1",
                transition: ".3s all ease-in-out",
              },
            }}
            src={logo}
          ></Box>
        </Link>
        <Typography component="p">
          THE OFFICIAL SITE OF{" "}
          <Typography component="span" sx={{ color: "#009A4E", fontWeight: "bold" }}>
            OVERLAND ATHLETICS
          </Typography>
        </Typography>
      </Box>
    </Grid>
  );
}
