import { TableRow, TableCell, Typography } from "@mui/material";

import React from "react";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
// Icons
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
// Images
import overland from "../../assets/teamLogos/overland.webp";
export default function ScheduleItem({ gameData }) {
  const theme = useTheme();
  // time - key on gameData object
  const { date, time, location, opponent, opponentLogo } = gameData;
  return (
    <TableRow>
      <TableCell sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.text.primary, width: "10%" }}>
        {date} <Typography component="p">{time}</Typography>
      </TableCell>
      <TableCell sx={{ width: "10%", textAlign: "center" }}>
        <Box component="img" src={overland} sx={{ maxWidth: "65px" }}></Box>
      </TableCell>
      <TableCell sx={{ width: "10%", textAlign: "center" }}>
        {location !== "Overland High" ? <AlternateEmailIcon /> : "Vs"}
      </TableCell>
      <TableCell sx={{ width: "10%", textAlign: "center" }}>
        <Box component="img" src={opponentLogo} sx={{ maxWidth: "55px" }}></Box>
      </TableCell>
      {/* <TableCell sx={{ width: "20%" }}>
        <Typography component="span">@ {location}</Typography>
      </TableCell> */}
    </TableRow>
  );
}
