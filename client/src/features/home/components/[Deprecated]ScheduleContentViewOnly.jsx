// Todo: This needs to be simplified.... we have 3 different components (eventItems, ScheduleItem, TeamRosterItem) that are all essentially the same thing... just different data. Instead we should have a universal component that can be used for all or just leverage existing dataTable component (like roster component)
import React from "react";
import useMediaQueries from "../../../utils/helpers/useMediaQueries.utils";
// MUI
import { Stack, Typography } from "@mui/material";
// Assets
import { LogoImage } from "../../../utils/theme/index.styles";
import overland from "../../../assets/overlandLogo2.webp";
// Icons
import LocationOnIcon from "@mui/icons-material/LocationOn";
// Styles
import {
  StyledLogoStack,
  DateDisplayContainer,
  StatusChip,
  LocationLinkWrapper,
  ScheduleCard,
  TeamLogoContainer,
  TeamLogoAvatar,
} from "./[Deprecated]ScheduleContentViewOnly.styles";
import { formatDateString } from "../../../utils/helpers/formatDate";
import { convertTo12HourFormat } from "../../../utils/helpers/convertTo24HourFormat";
import { useTheme } from "@emotion/react";
import { formatDateToLongString } from "../../../utils/helpers/formatDateToString";
import addToCalendarOrOpenMaps from "../../../utils/helpers/addToCalendarOrOpenMaps";

// Reusable Components
const DateDisplay = ({ month, day }) => {
  return (
    <DateDisplayContainer>
      <Typography variant="h6" component="h4" sx={{ fontSize: "14px !important" }}>
        {month}
      </Typography>
      <Typography variant="h6" component="h4" sx={{ fontWeight: "bold" }}>
        {day}
      </Typography>
    </DateDisplayContainer>
  );
};

const LocationLink = ({ location }) => {
  const theme = useTheme();
  return (
    <LocationLinkWrapper data-eventLocation={location} onClick={(e) => addToCalendarOrOpenMaps(e, "location")}>
      <LocationOnIcon
        sx={{
          fontSize: "1rem",
          [theme.breakpoints.up("md")]: {
            fontSize: "1.2rem",
          },
        }}
      />
      <Typography
        variant="small"
        component="small"
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          maxWidth: "180px",
          [theme.breakpoints.up("md")]: {
            fontSize: "14px",
          },
        }}
      >
        {location}
      </Typography>
    </LocationLinkWrapper>
  );
};

const TeamLogo = ({ logo, teamName }) => {
  const theme = useTheme();
  return (
    <TeamLogoContainer>
      {/* if no logo image */}
      {/* render in the first letter of the team name */}

      {logo ? (
        <LogoImage
          component="img"
          src={logo}
          sx={{
            width: "45px",
            height: "45px",
            objectFit: "cover",
            objectPosition: "center",
            [theme.breakpoints.up("laptop")]: {
              width: "50px",
              height: "50px",
            },
          }}
        />
      ) : (
        <TeamLogoAvatar>{teamName.charAt(0)}</TeamLogoAvatar>
      )}
      <Typography
        variant="h6"
        component="h5"
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          maxWidth: "120px",
          [theme.breakpoints.up("tablet")]: {
            maxWidth: "130px",
          },
          [theme.breakpoints.up("laptop")]: {
            maxWidth: "215px",
          },
        }}
      >
        {teamName}
      </Typography>
    </TeamLogoContainer>
  );
};

const MobileScheduleItem = ({ data, formattedDateMonth, formattedDateDay, eventId, ref, isPast }) => {
  const { time, location, date, opponent, home } = data;
  const theme = useTheme();
  return (
    <ScheduleCard isPast={isPast} ref={ref} id={eventId} variant="schedule-view-only" isMobile>
      <DateDisplay month={formattedDateMonth} day={formattedDateDay} />

      <Stack sx={{ width: "100%" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: ".25rem", width: "100%" }}>
          <Typography variant="h6" component="h5" sx={{ color: theme.palette.text.secondary3, fontSize: "12px !important" }}>
            {`${formatDateString(date).split(",")[0]},`}
            {` ${convertTo12HourFormat(time)}`}
          </Typography>
          <StatusChip label={home ? "Home" : "Away"} color="success" isHome={home} />
        </Stack>

        <Typography
          variant="h5"
          component="h4"
          sx={{
            textClamp: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxWidth: "175px",
            [theme.breakpoints.up("sm")]: {
              maxWidth: "200px",
            },
          }}
        >
          Overland Vs. {opponent}
        </Typography>

        <LocationLink location={location} />
      </Stack>
    </ScheduleCard>
  );
};

const DesktopScheduleItem = ({ data, formattedDateMonth, formattedDateDay, index, eventId, ref, isPast }) => {
  const { time, location, opponentIcon, home, date, opponent } = data;
  const theme = useTheme();

  return (
    <Stack direction="column" sx={{ "&:not(:first-child)": { marginTop: "2rem" } }} gap={1}>
      <ScheduleCard isPast={isPast} ref={ref} id={eventId} variant="schedule-view-only" isDesktop>
        <DateDisplay month={formattedDateMonth} day={formattedDateDay} />

        <Stack sx={{ width: "100%" }} direction="row" spacing={1.5} alignItems="center" justifyContent="space-between">
          <Stack direction="column" justifyContent="space-between" alignItems="flex-start" sx={{ mb: ".25rem" }}>
            <Typography variant="h6" component="h5" sx={{ color: theme.palette.text.secondary3, fontSize: "16px !important" }}>
              {`${formatDateString(date).split(",")[0]}`}, {`${convertTo12HourFormat(time)}`}
            </Typography>

            <StyledLogoStack direction="row" alignItems="center" justifyContent="flex-start" spacing={2} mb={1}>
              <TeamLogo logo={overland} teamName="Overland" />

              <Typography variant="span" component="span" sx={{ color: theme.palette.text.secondary3 }}>
                VS
              </Typography>

              <TeamLogo logo={opponentIcon} teamName={opponent} />
              {/* if no team logo show the first Letter of the team name and  */}
            </StyledLogoStack>
          </Stack>

          <Stack
            direction="column"
            alignItems="flex-end"
            justifyContent="flex-end"
            gap={4}
            sx={{
              maxWidth: "215px",
              [theme.breakpoints.up("tablet")]: {
                minWidth: "180px",
              },
            }}
          >
            <Stack direction="row" alignItems="center" gap={4}>
              {/* {index === 0 && (
                <Typography
                  variant="h6"
                  component="span"
                  sx={{ color: theme.palette.warning.main, fontSize: "14px !important", display: "flex", alignItems: "center", gap: ".25rem" }}
                >
                  <Box sx={{ height: "12px", width: "12px", backgroundColor: theme.palette.warning.main, borderRadius: "50%" }}></Box> Live
                </Typography>
              )} */}

              <StatusChip label={home === "TRUE" ? "Home" : "Away"} color="success" isHome={home === "TRUE"} />
            </Stack>

            <LocationLink location={location} />
          </Stack>
        </Stack>
      </ScheduleCard>
    </Stack>
  );
};

const ScheduleContentViewOnly = ({ data, eventId, index, ref }) => {
  const { location, date, isPast } = data;
  const { isTablet } = useMediaQueries();
  const formattedDate = formatDateToLongString(date);
  const formattedDateMonth = formattedDate.split(" ")[0];
  const formattedDateDay = formattedDate.split(" ")[1];

  const commonProps = {
    data,
    formattedDateMonth,
    formattedDateDay,
    eventId,
    ref,
    index,
    isPast,
  };

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

  return <div>{isTablet ? <DesktopScheduleItem {...commonProps} /> : <MobileScheduleItem {...commonProps} />}</div>;
};

export default ScheduleContentViewOnly;
