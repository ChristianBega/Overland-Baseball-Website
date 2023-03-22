import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function PlayerEvents({ currentInfo }) {
  return (
    <>
      {currentInfo.map((info, index) => (
        <Box key={index}>
          <Typography typography="bodyTextSm" sx={{ height: "150px", textAlign : 'center' }}>
            {info.content}
          </Typography>
          <Box sx={{ display: "flex", columnGap : 5 }}>
            <Box sx={{width : "50%", height : "65px", backgroundColor : "blue"}}>Documents</Box>
            <Box sx={{width : "50%", height : "65px", backgroundColor : "red"}}>Faqs</Box>
          </Box>
        </Box>
      ))}
    </>
  );
}
