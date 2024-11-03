// React and Material-UI imports
import React from "react";
import { Typography, Stack, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
// Components
import CmsOperationStatus from "../../../../../components/contentManagementSystem/cmsOperationStatus/cmsOperationStatus";
import CmsUploadItem from "../../../../../components/contentManagementSystem/cmsUploadItem/cmsUploadItem";
import InputFieldComponent from "../../../../../components/inputFields/inputFields";
// Styles
import { StyledTableCell, StyledTableRow } from "../../../../../styles/index.styles";
// Utility functions
import { formatDate } from "../../../../../setup/utils/helpers/formatDate";
import { convertTo24HourFormat } from "../../../../../setup/utils/helpers/convertTo24HourFormat";
// Assets
import overland from "../../../../../assets/homePage/teamLogos/overland.webp";

const LogoImage = styled(Box)(({ theme }) => ({
  width: "65px",
  height: "65px",
  display: "flex",
  objectFit: "contain",
  borderRadius: "50%",
  margin: "auto",
  "&.logo-image-square": {
    borderRadius: "0",
  },
  "&.logo-image-opponent": {
    margin: "auto 1.5rem auto 0",
  },
}));

export default function ScheduleItem({ ...props }) {
  const { data, isEditable, editableData, handleChange, isLoading, isError, isSuccess, renderAsRow = true, isCmsItem } = props;
  const currentData = isEditable ? editableData : data;
  const { date, time, location, opponent, opponentIcon } = currentData;

  console.log(editableData);
  if (isLoading || isError || isSuccess) {
    return <CmsOperationStatus isLoading={isLoading} isError={isError} isSuccess={isSuccess} />;
  }

  const content = (
    <>
      {!isEditable && editableData ? <StyledTableCell>{null}</StyledTableCell> : null}
      <StyledTableCell
        isCmsItem={isCmsItem}
        className={`table-cell-dark ${isEditable ? "isEditable" : ""}`}
        sx={{
          flex: "1 0 10%",
        }}
      >
        {isEditable ? (
          <InputFieldComponent cssProps={{ color: "#fff" }} label="Date" onChange={handleChange("date")} type="date" value={formatDate(date)} />
        ) : (
          <Typography component="p">{date}</Typography>
        )}
        {isEditable ? (
          <InputFieldComponent
            cssProps={{ color: "#fff" }}
            label="Time"
            onChange={handleChange("time")}
            type="time"
            value={convertTo24HourFormat(time)}
          />
        ) : (
          <Typography component="p">{time}</Typography>
        )}
      </StyledTableCell>

      <StyledTableCell isCmsItem={isCmsItem} sx={{ flex: "2 0 25%" }}>
        <LogoImage component="img" src={overland} />
      </StyledTableCell>

      <StyledTableCell isCmsItem={isCmsItem} className="special-symbol-style" sx={{ flex: "0 0 10%" }}>
        {location !== "Overland High" ? "@" : "Vs"}
      </StyledTableCell>

      <StyledTableCell isCmsItem={isCmsItem} className={`table-cell ${isEditable ? "isEditable" : ""}`}>
        {isEditable ? (
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <LogoImage className="logo-image-opponent" component="img" src={opponentIcon} />
            <Stack direction="column">
              <CmsUploadItem
                label="Opponent Icon"
                placeholderTextfield="Enter your url from a cdn..."
                onChange={handleChange("opponentIcon")}
                value={opponentIcon}
                cmsItemType="opponentIcon"
              />
            </Stack>
          </Box>
        ) : (
          <LogoImage component="img" src={opponentIcon} />
        )}
      </StyledTableCell>

      <StyledTableCell
        isCmsItem={isCmsItem}
        className={`${isEditable ? "isEditable" : ""}`}
        sx={{
          flex: "3 0 30%",
          textAlign: !isEditable ? "center" : "left",
        }}
      >
        <Stack>
          {isEditable ? (
            <InputFieldComponent label="Opponent Name" onChange={handleChange("opponent")} type="text" value={opponent} />
          ) : (
            <Typography component="span">Opponent: {opponent}</Typography>
          )}
          {isEditable ? (
            <InputFieldComponent label="Game Location" onChange={handleChange("location")} type="text" value={location} />
          ) : (
            <Typography component="span">Location: {location}</Typography>
          )}
        </Stack>
      </StyledTableCell>
      {/* {!isEditable ? <StyledTableCell>{null}</StyledTableCell> : null} */}
    </>
  );

  return renderAsRow ? <StyledTableRow>{content}</StyledTableRow> : content;
}
