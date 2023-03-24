import { Link } from "react-router-dom";
// Image assets
import Logo from "../../assets/logoNoBackground.png";

import { Box } from "@mui/material";

export default function OverlandLogo() {
  return (
    <Link to="/">
      <Box
        sx={{
          // mixBlendMode: "multiply",
          background: "white",
          display: "flex",
          alignItems: "center",
          columnGap: 4,
          color: "#fff",
          borderRadius: "50%",
          cursor : "pointer"
          // filter: "brightness(0) invert(1)",
          // filter : "grayscale(100%)"
        }}
      >
        {/* <img src={Logo}/> */}
        <Box component="img" sx={{ height: "75px", width: "auto" }} src={Logo}></Box>
      </Box>
    </Link>
  );
}
