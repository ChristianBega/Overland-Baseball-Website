import { Link } from "react-router-dom";
// Image assets
import logo from "../../../assets/overlandLogo_3.png"

import { Box,Grid, Typography } from "@mui/material";

export default function logofooter() {
  return (
    <Grid item xs={12} sx={{display:"flex",justifyContent:"center"}}>
    
      <Box
        sx={{
          display: "flex",
          flexDirection:"column",
          alignItems: "center",
          columnGap: 4,
          borderRadius: "50%",
          cursor : "pointer"
        }}
      ><Link to="/">
        <Box component="img" sx={{ height: "75px", width: "auto" }} src={logo}></Box>
        </Link>
        <Typography component="p">
          THE OFFICIAL SITE OF <Typography component="span" sx={{color:"#009A4E", fontWeight:"bold"}}>OVERLAND ATHLETICS</Typography> 
        </Typography>
      </Box>
    </Grid>
  );
}