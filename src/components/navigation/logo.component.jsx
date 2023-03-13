import { Link } from "react-router-dom";
// Image assets
import Logo from "../../assets/overlandLogo.jpg";

import { Box } from "@mui/material";

export default function OverlandLogo() {
  return (
    <Link to="/">
      <Box
        sx={{
          mixBlendMode: "multiply",
          display: "flex",
          alignItems: "center",
          columnGap: 4,
          color: "#fff",
          borderRadius: "50%",
        }}
      >
        <Box component="img" sx={{ height: "75px", width: "auto" }} src={Logo}></Box>
      </Box>
    </Link>
  );
}
