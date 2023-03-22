import {  TableRow, TableCell, Typography } from "@mui/material";


import React from "react";
import { useTheme } from "@mui/material/styles";

export default function ScheduleItem({ gameData }) {
  const theme = useTheme()
  // time - key on gameData object
  const { date, time, location, homeTeam, awayTeam } = gameData;
  return (
    // <ListItem sx={{ bgcolor: "green", textAlign: "left", paddingY: { sm: 2, md: 5 } }}>
    //   <ListItemText primary={date} sx={{ flex: 0.7 }} />
    //   <ListItemText sx={{ display: "flex", flex: 1 }} primary={<AlternateEmailIcon sx={{ height: "1rem" }} />} secondary={location} />

    //   <Box sx={{ display: "flex", flex: 2, textAlign: "center" }}>
    //     <ListItemText primary={homeTeam} sx={{ flex: 3 }} />
    //     <ListItemText primary="Vs." sx={{ flex: 1 }} />
    //     <ListItemText primary={awayTeam} sx={{ flex: 3 }} />
    //   </Box>
    // </ListItem>
    <TableRow>
      <TableCell sx={{ backgroundColor: theme.palette.primary.main, color : theme.palette.text.primary, width: "10%" }}>
        {date} <Typography component="p">{time}pm</Typography>
      </TableCell>
      <TableCell sx={{  width: "30%" , textAlign : "center"}}>{homeTeam}</TableCell>
      <TableCell sx={{ width: "10%", textAlign: "center" }}>VS</TableCell>
      <TableCell sx={{  width: "30%" , textAlign : "center"}}>{awayTeam}</TableCell>
      <TableCell sx={{  width: "20%" }}>
        <Typography component="span">@ {location}</Typography>
      </TableCell>
    </TableRow>
  );
}
