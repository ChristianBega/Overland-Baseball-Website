import React from "react";
// MUI
import { Box, Stack, Typography } from "@mui/material";
// Components
import InputFieldComponent from "../../../../../../../../../components/inputFields/inputFields";
import CmsUploadItem from "../../../../../../../../../components/contentManagementSystem/cmsUploadItem/cmsUploadItem";
import { LogoImage, StyledTableCell } from "../../../../../../../../../styles/index.styles";
// Utils & Helpers
import { formatDate } from "../../../../../../../../../setup/utils/helpers/formatDate";
import { convertTo24HourFormat } from "../../../../../../../../../setup/utils/helpers/convertTo24HourFormat";
// Assets
import overland from "../../../../../../../../../assets/homePage/teamLogos/overland.webp";

const ScheduleContentEditable = ({ ...props }) => {
  const { isEditable, editableData, handleChange, isCmsItem } = props;
  const { date, time, location, opponent, opponentIcon } = props.data;
  return (
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
};

export default ScheduleContentEditable;
