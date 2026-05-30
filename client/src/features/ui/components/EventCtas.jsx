// Todo: Need to have a way to pass in a custom maxChars for the location text
import React from "react";
import ButtonBlock from "./ButtonBlock";
import { StyledIconButton } from "../../home/components/EventCard.styles";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import addToCalendarOrOpenMaps from "../../../utils/helpers/addToCalendarOrOpenMaps";
import { formatDateTimeForCalendar } from "../../../utils/helpers/formatDate";
import TextTruncate from "./TextTruncate";
import useMediaQueries from "../../../utils/helpers/useMediaQueries.utils";

export const EventCardCtas = ({ data, variant = "minimal", ...rest }) => {
  const { startDateTime, endDateTime, title, location, description } = data || {};

  const { isSm, isMobileLg } = useMediaQueries();
  return (
    <ButtonBlock spacing={1} direction={isMobileLg ? "row" : "column"} sx={{ ...rest?.sx }}>
      <StyledIconButton
        data-eventDescription={description}
        data-startDateTime={startDateTime}
        data-endDateTime={endDateTime}
        data-eventTitle={data.title}
        data-eventLocation={location}
        variant={variant}
        color="secondary"
        startIcon={<CalendarMonthIcon />}
        onClick={(e) => addToCalendarOrOpenMaps(e, "date")}
      >
        <TextTruncate
          text={formatDateTimeForCalendar(startDateTime)}
          variant="body2"
          component="p"
          maxChars={!isMobileLg ? 15 : !isSm ? 20 : 30}
          showButton={false}
        />
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
        {/* if variant === minimalSmall --> maxChars should be like 10 */}
        <TextTruncate
          text={location}
          variant="body2"
          component="p"
          maxChars={!isMobileLg ? 15 : !isSm ? 20 : variant === "minimalSmall" ? 15 : 25}
          showButton={false}
        />
      </StyledIconButton>
    </ButtonBlock>
  );
};
