import React from "react";
import { useTheme } from "@emotion/react";
import { IconButton, Typography, Stack } from "@mui/material";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import InputFieldComponent from "../../../../components/inputFields/inputFields";
import CmsOperationStatus from "../../../../components/contentManagementSystem/cmsOperationStatus/cmsOperationStatus";
import { StyledTableCell, StyledTableRow } from "../../../../styles/index.styles";
// import { formatDate } from "../../../../../setup/utils/helpers/formatDate";
// import { convertTo24HourFormat } from "../../../../../setup/utils/helpers/convertTo24HourFormat";
import useMediaQueries from "../../../../setup/utils/helpers/useMediaQueries.utils";

export default function EventItems({ ...props }) {
  const { isMd } = useMediaQueries();
  const { data, isEditable, editableData, handleChange, isLoading, isError, isSuccess, renderAsRow = true, isCmsItem } = props;
  const [open, setOpen] = React.useState(false);
  const [currentEventData, setCurrentEventData] = React.useState({
    // eventName: "",
    // date: "",
    // time: "",
    // title: "",
    startDateTime: "",
    endDateTime: "",
    description: "",
    eventImage: "",
    location: "",
  });
  const theme = useTheme();

  const currentData = isEditable ? editableData : data;
  const { eventName, location, date, time, startDateTime, endDateTime, description, eventImage, title } = currentData || {};

  if (isLoading || isError || isSuccess) {
    return <CmsOperationStatus isLoading={isLoading} isError={isError} isSuccess={isSuccess} />;
  }

  const handleOpen = (event) => {
    let currentEvent = event.currentTarget.closest("[data-event]").getAttribute("data-event");
    let currentDate = event.currentTarget.closest("[data-date]").getAttribute("data-date");
    let currentTime = event.currentTarget.closest("[data-time]").getAttribute("data-time");
    setCurrentEventData({ event: currentEvent, date: currentDate, time: currentTime });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const content = (
    <>
      {!isEditable && editableData ? <StyledTableCell>{null}</StyledTableCell> : null}
      <StyledTableCell isCmsItem={isCmsItem} className={`table-header-cell-wide ${!isEditable ? "table-cell-center" : ""}`}>
        {isEditable ? (
          <>
            <InputFieldComponent label="Start Date & Time" onChange={handleChange("startDateTime")} type="dateTimeLocal" value={startDateTime} />
            {/* <InputFieldComponent label="End Date & Time" onChange={handleChange("endDateTime")} type="dateTimeLocal" value={endDateTime} /> */}

            {/* <InputFieldComponent cssProps={{ color: "#fff" }} label="Date" onChange={handleChange("date")} type="date" value={formatDate(date)} />
            <InputFieldComponent
              cssProps={{ color: "#fff" }}
              label="Time"
              onChange={handleChange("time")}
              type="time"
              value={convertTo24HourFormat(time)}
            /> */}
          </>
        ) : (
          <Stack direction="column" justifyContent="center" gap={1}>
            <Typography component="p" variant="body1">
              {startDateTime}
            </Typography>
          </Stack>
        )}
      </StyledTableCell>

      {isMd && (
        <StyledTableCell isCmsItem={isCmsItem} className="table-header-cell-extra-wide">
          {isEditable ? (
            <InputFieldComponent label="Location" onChange={handleChange("location")} type="text" value={location} />
          ) : (
            <Typography>{location}</Typography>
          )}
        </StyledTableCell>
      )}

      <StyledTableCell isCmsItem={isCmsItem} className={`table-header-cell-normal ${!isEditable ? "table-cell-center" : ""}`}>
        {isEditable ? (
          <InputFieldComponent
            inputTextColor="#fff"
            cssProps={{ color: "#fff" }}
            label="Event Title"
            onChange={handleChange("title")}
            type="text"
            value={title}
          />
        ) : (
          <>
            {!isCmsItem && (
              <IconButton onClick={handleOpen} size="medium" style={{ color: theme.palette.text.primary }}>
                <AppRegistrationIcon fontSize="small" />
              </IconButton>
            )}
            <Typography component={"span"} sx={{ fontSize: "1rem", textAlign: "center" }}>
              {title}
            </Typography>
          </>
        )}
      </StyledTableCell>
    </>
  );

  return renderAsRow ? (
    <StyledTableRow data-event={eventName} data-date={date} data-time={time}>
      {content}
    </StyledTableRow>
  ) : (
    content
  );
}
