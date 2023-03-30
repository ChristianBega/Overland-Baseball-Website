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
  // const [isMobile, setIsMobile] = useState();

  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // const checkIsMobile = () => {
  //   if () {
  //     alert("yes");
  //   }
  // };

  return (
    <StyledTableRow>
      <TableCell
        sx={{
          width: "30%",
          fontWeight: "bold",
          textAlign: "center",
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.text.primary,
        }}
      >
        {date}
        <Typography component="span" sx={{ display: "block" }}>
          {time}
        </Typography>
      </TableCell>

      <TableCell sx={{ width: "60%" }}>{location}</TableCell>

      {!isMobile && (
        <TableCell
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.text.primary,
            width: "10%",
          }}
        >
          {eventName}
        </TableCell>
      )}
    </StyledTableRow>
  );
}
