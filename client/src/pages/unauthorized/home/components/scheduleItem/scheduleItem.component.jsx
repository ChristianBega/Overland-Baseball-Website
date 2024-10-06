import React from "react";
import { TableRow, TableCell, Typography, Stack, Box, styled } from "@mui/material";
import { useTheme } from "@mui/material";

// Assets
import overland from "../../../../../assets/homePage/teamLogos/overland.webp";
import { formatDate } from "../../../../../setup/utils/helpers/formatDate";
import { convertTo24HourFormat } from "../../../../../setup/utils/helpers/convertTo24HourFormat";
import CmsOperationStatus from "../../../../authorized/contentManagementSystem/cmsOperationStatus/cmsOperationStatus";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: "#f2f2f2",
    boxShadow: 10,
  },
}));

export default function ScheduleItem({ data, isEditable, editableData, handleChange, isLoading, isError, isSuccess, renderAsRow = true }) {
  const theme = useTheme();
  const currentData = isEditable ? editableData : data;
  const { date, time, location, opponent, opponentIcon } = currentData;

  if (isLoading || isError || isSuccess) {
    return <CmsOperationStatus isLoading={isLoading} isError={isError} isSuccess={isSuccess} />;
  }

  const content = (
    <>
      <TableCell
        className="table-cell"
        sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.text.primary, flex: "1 0 10%", textAlign: "center" }}
      >
        {isEditable ? (
          <input onChange={handleChange("date")} type="date" value={formatDate(date)}></input>
        ) : (
          <Typography component="p">{date}</Typography>
        )}
        {isEditable ? (
          <input onChange={handleChange("time")} type="time" value={convertTo24HourFormat(time)}></input>
        ) : (
          <Typography component="p">{time}</Typography>
        )}
      </TableCell>
      <TableCell sx={{ flex: "2 0 25%" }}>
        <Box component="img" src={overland} sx={{ maxWidth: "65px", display: "flex", margin: "auto" }}></Box>
      </TableCell>
      <TableCell sx={{ flex: "0 0 10%", fontFamily: "'Lilita One', cursive", fontSize: { xs: 18, md: 22, textAlign: "center" } }}>
        {location !== "Overland High" ? "@" : "Vs"}
      </TableCell>
      <TableCell sx={{ flex: "2 0 25%" }}>
        {isEditable ? (
          <input onChange={handleChange("opponentIcon")} type="text" value={opponentIcon}></input>
        ) : (
          <Box component="img" src={opponentIcon} sx={{ maxWidth: "55px", display: "flex", margin: "auto", borderRadius: "50%" }}></Box>
        )}
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
          {isEditable ? (
            <input onChange={handleChange("opponent")} type="text" value={opponent}></input>
          ) : (
            <Typography component="span">Opponent: {opponent}</Typography>
          )}
          {isEditable ? (
            <input onChange={handleChange("location")} type="text" value={location}></input>
          ) : (
            <Typography component="span">Location: {location}</Typography>
          )}
        </Stack>
      </TableCell>
    </>
  );

  return renderAsRow ? <StyledTableRow>{content}</StyledTableRow> : content;
}
