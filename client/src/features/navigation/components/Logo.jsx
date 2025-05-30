import React from "react";
import { Link as RouterLink } from "react-router-dom";
// Assets
import Logo from "../../../assets/overlandLogo2.webp";
// MUI components
import { Box, Link } from "@mui/material";

const styles = {
  linkBox: {
    display: "flex",
    alignItems: "center",
    columnGap: 4,
    cursor: "pointer",
    "&:hover": {
      cursor: "pointer",
      scale: "1.1",
      transition: ".3s all ease-in-out",
    },
  },
  imageBox: {
    height: "55px",
    width: "auto",
  },
};

export default function OverlandLogo() {
  return (
    <Link component={RouterLink} to="/">
      <Box sx={styles.linkBox}>
        <Box component="img" sx={{ height: { xs: "50px", md: "55px", lg: "65px" }, width: "auto" }} src={Logo} />
      </Box>
    </Link>
  );
}
