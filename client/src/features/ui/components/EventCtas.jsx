import React from "react";
import ButtonBlock from "./ButtonBlock";
import { StyledIconButton } from "../../home/components/EventCard.styles";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import addToCalendarOrOpenMaps from "../../../utils/helpers/addToCalendarOrOpenMaps";
import { formatDateTimeForCalendar } from "../../../utils/helpers/formatDate";

export const EventCardCtas = ({ data, variant = "minimal", ...rest }) => {
  const { startDateTime, endDateTime, title, location } = data || {};
  return (
    <ButtonBlock spacing={1} direction="row" sx={{ ...rest?.sx }}>
      <StyledIconButton
        data-startDateTime={startDateTime}
        data-endDateTime={endDateTime}
        data-eventTitle={title}
        data-eventLocation={location}
        variant={variant}
        color="secondary"
        startIcon={<CalendarMonthIcon />}
        onClick={(e) => addToCalendarOrOpenMaps(e, "date")}
      >
        {formatDateTimeForCalendar(startDateTime)}
      </StyledIconButton>
      <StyledIconButton
        data-startDateTime={startDateTime}
        data-endDateTime={endDateTime}
        data-eventTitle={title}
        data-eventLocation={location}
        variant={variant}
        color="secondary"
        startIcon={<LocationOnIcon />}
        onClick={(e) => addToCalendarOrOpenMaps(e, "location")}
      >
        {location}
      </StyledIconButton>
    </ButtonBlock>
  );
};
