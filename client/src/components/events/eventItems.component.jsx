import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { TableCell, TableRow, Typography } from "@mui/material";
import React from "react";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-child(even)": {
    backgroundColor: "#f2f2f2",
    boxShadow: 10,
  },
}));

export default function EventItems({ event, isMobile }) {
  // extra data from event object : description, extraInformation
  const { eventName, location, date, time } = event;
  const theme = useTheme();

  return (
    <StyledTableRow>
      <TableCell
        sx={{
          // width: { xs: "30%", md: "20%" },
          flex: "1 0 20%",
          fontWeight: "bold",
          textAlign: "center",
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.text.primary,
        }}
      >
        {date}
        <Typography component="span" sx={{ display: { xs: "block", md: "inline" }, pl: { md: 2 } }}>
          {time}
        </Typography>
      </TableCell>

      <TableCell sx={{ flex: "3 0 60%" }}>{location}</TableCell>

      {!isMobile && (
        <TableCell
          sx={{
            // width: { xs: "30%" },
            flex: "1 0 20%",
            textAlign: "center",
            fontWeight: "bold",
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.text.primary,
          }}
        >
          {eventName}
        </TableCell>
      )}
    </StyledTableRow>
  );
}
