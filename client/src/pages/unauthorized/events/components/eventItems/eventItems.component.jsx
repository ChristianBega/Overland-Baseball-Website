import React from "react";
import { useTheme } from "@emotion/react";
import { IconButton, Typography, Stack } from "@mui/material";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import InputFieldComponent from "../../../../../components/inputFields/inputFields";
import VolunteerModal from "../../../../../components/modals/volunteerModal.component";
import CmsOperationStatus from "../../../../../components/contentManagementSystem/cmsOperationStatus/cmsOperationStatus";
import { StyledTableCell, StyledTableRow } from "../../../../../styles/index.styles";
import { formatDate } from "../../../../../setup/utils/helpers/formatDate";
import { convertTo24HourFormat } from "../../../../../setup/utils/helpers/convertTo24HourFormat";

export default function EventItems({ ...props }) {
  const { data, isMobile, isEditable, editableData, handleChange, isLoading, isError, isSuccess, renderAsRow = true, isCmsItem } = props;
  const [open, setOpen] = React.useState(false);
  const [currentEventData, setCurrentEventData] = React.useState({ event: "", date: "", time: "" });
  const theme = useTheme();

  const currentData = isEditable ? editableData : data;
  const { eventName, location, date, time } = currentData || {
    eventName: "123",
    location: "321",
    date: "123",
    time: "321",
    description: "123",
  };

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
      <StyledTableCell isCmsItem={isCmsItem} className={`table-cell-accent table-header-cell-wide ${!isEditable ? "table-cell-center" : ""}`}>
        {isEditable ? (
          <>
            <InputFieldComponent cssProps={{ color: "#fff" }} label="Date" onChange={handleChange("date")} type="date" value={formatDate(date)} />
            <InputFieldComponent
              cssProps={{ color: "#fff" }}
              label="Time"
              onChange={handleChange("time")}
              type="time"
              value={convertTo24HourFormat(time)}
            />
          </>
        ) : (
          <Stack direction="row" justifyContent="center" gap={4}>
            <Typography component="p" variant="body1">
              {date}
            </Typography>
            <Typography component="p" variant="body1">
              {time}
            </Typography>
          </Stack>
        )}
      </StyledTableCell>

      <StyledTableCell isCmsItem={isCmsItem} className="table-header-cell-extra-wide">
        {isEditable ? (
          <InputFieldComponent label="Location" onChange={handleChange("location")} type="text" value={location} />
        ) : (
          <Typography>{location}</Typography>
        )}
      </StyledTableCell>

      {!isMobile && (
        <StyledTableCell isCmsItem={isCmsItem} className={`table-header-cell-normal table-cell-dark ${!isEditable ? "table-cell-center" : ""}`}>
          {isEditable ? (
            <InputFieldComponent
              inputTextColor="#fff"
              cssProps={{ color: "#fff" }}
              label="Event Name"
              onChange={handleChange("eventName")}
              type="text"
              value={eventName}
            />
          ) : (
            <>
              {!isCmsItem && (
                <IconButton onClick={handleOpen} size="medium" style={{ color: theme.palette.text.primary }}>
                  <AppRegistrationIcon fontSize="small" />
                </IconButton>
              )}
              <Typography component={"span"} sx={{ fontSize: "1rem", textAlign: "center" }}>
                {eventName}
              </Typography>
            </>
          )}
        </StyledTableCell>
      )}

      <VolunteerModal
        open={open}
        handleClose={handleClose}
        currentEventData={currentEventData}
        setCurrentEventData={setCurrentEventData}
        datatypeRegistration="events"
      />
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
