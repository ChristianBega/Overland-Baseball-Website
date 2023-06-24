import { Link } from "react-router-dom";
// Image assets
import Logo from "../../assets/overlandLogo2.webp";

import { Box } from "@mui/material";

export default function OverlandLogo() {
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
        <Box component="img" sx={{ height: "75px", width: "auto" }} src={Logo}></Box>
      </Box>
    </Link>
  );
}
