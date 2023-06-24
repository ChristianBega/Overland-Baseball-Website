import { Link } from "react-router-dom";
// Image assets
import Logo from "../../assets/overlandLogo2.png";

import { Box } from "@mui/material";
import { useTheme } from "@emotion/react";

export default function OverlandLogo() {
  const theme = useTheme();
  return (
    <Link to="/">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          columnGap: 4,
          cursor: "pointer",
          "&:hover": {
            cursor: "pointer",
            scale: "1.1",
            transition: ".3s all ease-in-out",
          },
        }}
      >
        {/* <img src={Logo}/> */}
        <Box component="img" sx={{ height: "75px", width: "auto" }} src={Logo}></Box>
      </Box>
    </Link>
  );
}
