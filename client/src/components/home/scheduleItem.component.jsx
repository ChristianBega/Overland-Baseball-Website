import React from "react";
import { TableRow, TableCell, Typography, Stack, Box, styled } from "@mui/material";
import { useTheme } from "@mui/material";

// Assets
import overland from "../../assets/teamLogos/overland.webp";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-child(even)": {
    backgroundColor: "#f2f2f2",
    boxShadow: 10,
  },
}));

export default function ScheduleItem({ gameData }) {
  const theme = useTheme();
  // time - key on gameData object
  const { date, time, location, opponent, opponentLogo } = gameData;

  return (
    <StyledTableRow>
      <TableCell sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.text.primary, flex: "1 0 10%", textAlign: "center" }}>
        <Typography component="p">{date}</Typography>
        <Typography component="p">{time}</Typography>
      </TableCell>
      <TableCell sx={{ flex: "2 0 25%" }}>
        <Box component="img" src={overland} sx={{ maxWidth: "65px", display: "flex", margin: "auto" }}></Box>
      </TableCell>
      <TableCell sx={{ flex: "0 0 10%", fontFamily: "'Lilita One', cursive", fontSize: { xs: 18, md: 22, textAlign: "center" } }}>
        {location !== "Overland High" ? "@" : "Vs"}
      </TableCell>
      <TableCell sx={{ flex: "2 0 25%" }}>
        <Box component="img" src={opponentLogo} sx={{ maxWidth: "55px", display: "flex", margin: "auto", borderRadius: "50%" }}></Box>
      </TableCell>

      <TableCell
        sx={{
          flex: "3 0 30%",
          textAlign: "center",
          [theme.breakpoints.only("xs")]: {
            display: "none",
          },
        }}
      >
        <Stack>
          <Typography component="span">Opponent: {opponent}</Typography>
          <Typography component="span">Location: {location}</Typography>
        </Stack>
      </TableCell>
    </StyledTableRow>
  );
}
