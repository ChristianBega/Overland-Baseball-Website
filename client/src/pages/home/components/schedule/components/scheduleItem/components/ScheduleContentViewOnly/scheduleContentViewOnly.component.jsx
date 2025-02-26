import React from "react";
// MUI
import { Card, Stack, Typography } from "@mui/material";
// Assets
import { LogoImage } from "../../../../../../../../styles/index.styles";
import overland from "../../../../../../../../assets/overlandLogo2.webp";
// Icons
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Groups3Icon from "@mui/icons-material/Groups3";
// Styles
import { StyledLogoStack, StyledScheduleItemContainer, StyledDateStack, StyledLocationLink } from "./scheduleContentViewOnly.styles";
import { formatDateString } from "../../../../../../../../setup/utils/helpers/formatDate";
import { convertTo12HourFormat } from "../../../../../../../../setup/utils/helpers/convertTo24HourFormat";
import useMediaQueries from "../../../../../../../../setup/utils/helpers/useMediaQueries.utils";

const logoStyles = { width: { sm: "65px", xs: "50px" }, height: { sm: "65px", xs: "50px" } };
const logoDividerStyles = { color: "#fff" };
const ScheduleContentViewOnly = ({ ...props }) => {
  const { formattedDateMonth, formattedDateDay } = props;
  const { time, location, opponentIcon, home, date, opponent } = props.data;
  const { isSm, isMd } = useMediaQueries();
  // ! move this logic into a handleNavigatingToCalendarOrMap func
  const handleScheduleItemClick = (event) => {
    if (event.currentTarget.id === "schedule-location") {
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
      window.open(mapsUrl, "_blank");
    } else if (event.currentTarget.id === "schedule-item-container") {
      // & we need to update the props.data value in firbase to include  the following values :
      // ! - startDateTime
      // ! - endDateTime
      // ! - title
      // ! - location name
      // ! - location address
      // ! - location coordinates
      // ! - description (this description can be pre typed and just use values to dynamically generate the description)
      const calendarUrl = `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(
        "coming soon..."
      )}&dates=${date}&details=${encodeURIComponent("coming soon....")}&location=${encodeURIComponent(location)}`;
      window.open(calendarUrl, "_blank");
    }
  };

  return (
    <Stack direction="column" sx={{ "&:not(:first-child)": { marginTop: "2rem" } }} gap={2}>
      <Typography variant="h5" component="h3">
        {formatDateString(date)}
      </Typography>
      <Card ref={props.ref} id={props.eventId} variant="schedule-view-only">
        <StyledScheduleItemContainer id={"schedule-item-container"} onClick={handleScheduleItemClick}>
          <StyledDateStack>
            <Typography variant="h6" component="h4">
              {formattedDateMonth} {formattedDateDay}
            </Typography>
            <Typography variant="h6" component="h4">
              {convertTo12HourFormat(time)}
            </Typography>
          </StyledDateStack>
          <Stack
            direction={isSm ? "row" : "column"}
            justifyContent={isSm ? "space-evenly" : "flex-start"}
            alignItems={"center"}
            sx={{ width: "100%" }}
          >
            <StyledLogoStack direction="row" alignItems="center" spacing={isMd ? 4 : 3} mb={1}>
              <LogoImage component="img" src={overland} sx={logoStyles} />
              {home ? (
                <Typography variant="h5" component="span" sx={logoDividerStyles}>
                  @
                </Typography>
              ) : (
                <Typography variant="h5" component="span" sx={logoDividerStyles}>
                  VS
                </Typography>
              )}
              <LogoImage component="img" src={opponentIcon} sx={logoStyles} />
            </StyledLogoStack>
            <Stack alignItems="center" sx={{ textAlign: "center", width: isSm ? "auto" : "90%" }}>
              <StyledLocationLink
                id={"schedule-location"}
                onClick={handleScheduleItemClick}
                className={!isSm && "ellipsisText-2"}
                variant="highlighted"
              >
                {isMd ? "Location:" : <LocationOnIcon sx={{ fontSize: { xs: "1rem", md: "1.2rem" } }} />}
                {location}
              </StyledLocationLink>

              {isSm && (
                <Typography variant="body1" component="span" sx={{ color: "#fff", display: "flex", alignItems: "center", gap: ".25rem" }}>
                  {isMd ? "Opponent Name:" : <Groups3Icon sx={{ fontSize: { sm: "1rem", md: "1.2rem" } }} />} {opponent}
                </Typography>
              )}
            </Stack>
          </Stack>
        </StyledScheduleItemContainer>
      </Card>
    </Stack>
  );
};

export default ScheduleContentViewOnly;
