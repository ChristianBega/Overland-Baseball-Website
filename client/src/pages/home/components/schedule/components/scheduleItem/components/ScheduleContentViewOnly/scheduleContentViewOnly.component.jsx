import React from "react";
import useMediaQueries from "../../../../../../../../setup/utils/helpers/useMediaQueries.utils";
// MUI
import { Box, Card, Chip, Link, Stack, Typography } from "@mui/material";
// Assets
import { LogoImage } from "../../../../../../../../styles/index.styles";
import overland from "../../../../../../../../assets/overlandLogo2.webp";
// Icons
import LocationOnIcon from "@mui/icons-material/LocationOn";
// Styles
import { StyledLogoStack } from "./scheduleContentViewOnly.styles";
import { formatDateString } from "../../../../../../../../setup/utils/helpers/formatDate";
import { convertTo12HourFormat } from "../../../../../../../../setup/utils/helpers/convertTo24HourFormat";
import { useTheme } from "@emotion/react";
import { formatDateToLongString } from "../../../../../../../../setup/utils/helpers/formatDateToString";
const logoStyles = {
  width: { xs: "45px", laptop: "50px" },
  height: { xs: "45px", laptop: "50px" },
  objectFit: "cover",
  objectPosition: "center",
};

const MobileScheduleItem = ({ ...props }) => {
  const { formattedDateMonth, formattedDateDay } = props;
  const { time, location, date, opponent } = props.data;
  const theme = useTheme();
  return (
    <Card ref={props.ref} id={props.eventId} variant="schedule-view-only" sx={{ justifyContent: "flex-start", gap: "1rem", padding: ".75rem" }}>
      <Stack
        sx={{
          minHeight: { xs: "85px", sm: "90px", md: "95px", lg: "110px" },
          minWidth: { xs: "85px", sm: "90px", md: "95px", lg: "110px" },
          backgroundColor: "#01984E",
          color: "#fff",
          padding: ".5rem",
          borderRadius: "4px",
        }}
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h6" component="h4">
          {formattedDateMonth}
        </Typography>
        <Typography variant="h6" component="h4">
          {formattedDateDay}
        </Typography>
      </Stack>
      <Stack sx={{ width: "100%" }}>
        <Stack direction={"row"} justifyContent="space-between" alignItems="center" sx={{ mb: ".25rem", width: "100%" }}>
          <Typography variant="h6" component="h5" sx={{ color: theme.palette.text.secondary3 }}>
            {`${formatDateString(date).split(",")[0]},`}
            {` ${convertTo12HourFormat(time)}`}
          </Typography>
          <Chip
            label="Home"
            color="success"
            sx={{
              fontSize: "12px",
              backgroundColor: "#17c7722b",
              border: "1px solid #01984E",
              height: { xs: "20px", sm: "30px", "& .MuiChip-label": { color: theme.palette.secondary.main } },
            }}
          />
        </Stack>
        <Typography
          variant="h5"
          component="h4"
          sx={{
            textClamp: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            // maxWidth: { xs: "200px", sm: "400px", md: "600px" },
          }}
        >
          Overland Vs. {opponent}
        </Typography>
        <Link
          sx={{
            display: "flex",
            alignItems: "center",
            gap: ".25rem",
            fontSize: "14px",
            textDecoration: "underline",
            // maxWidth: "200px",
            // overflow: "hidden",
            // textOverflow: "ellipsis",
            // whiteSpace: "nowrap",
          }}
        >
          <LocationOnIcon sx={{ fontSize: { xs: "1rem", md: "1.2rem" } }} />
          {location}
        </Link>
      </Stack>
    </Card>
  );
};

const DesktopScheduleItem = ({ ...props }) => {
  const { formattedDateMonth, formattedDateDay, index } = props;
  const { time, location, opponentIcon, home, date, opponent } = props.data;
  const theme = useTheme();
  return (
    <Stack direction="column" sx={{ "&:not(:first-child)": { marginTop: "2rem" } }} gap={1}>
      <Card
        ref={props.ref}
        id={props.eventId}
        variant="schedule-view-only"
        sx={{ justifyContent: "flex-start", gap: "1rem", padding: ".75rem", alignItems: "center" }}
      >
        <Stack
          sx={{
            minHeight: { xs: "85px", sm: "90px", md: "95px", lg: "110px" },
            minWidth: { xs: "85px", sm: "90px", md: "95px", lg: "110px" },
            backgroundColor: "#01984E",
            color: "#fff",
            padding: ".5rem",
            borderRadius: "4px",
          }}
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h6" component="h4" sx={{ fontSize: "14px !important" }}>
            {formattedDateMonth}
          </Typography>
          <Typography variant="h6" component="h4" sx={{ fontWeight: "bold" }}>
            {formattedDateDay}
          </Typography>
        </Stack>
        <Stack sx={{ width: "100%" }} direction={"row"} spacing={1.5} alignItems="center" justifyContent="space-between">
          <Stack direction={"column"} justifyContent="space-between" alignItems="flex-start" sx={{ mb: ".25rem" }}>
            <Typography variant="h6" component="h5" sx={{ color: theme.palette.text.secondary3, fontSize: "16px !important" }}>
              {`${formatDateString(date).split(",")[0]}`}, {`${convertTo12HourFormat(time)}`}
            </Typography>
            <StyledLogoStack direction="row" alignItems="center" justifyContent="flex-start" spacing={2} mb={1}>
              <Stack direction={"row"} alignItems="center" spacing={2}>
                <LogoImage component="img" src={overland} sx={logoStyles} />
                <Typography variant="h6" component="h5">
                  Overland
                </Typography>
              </Stack>
              <Typography variant="span" component="span" sx={{ color: theme.palette.text.secondary3 }}>
                VS
              </Typography>
              <Stack direction={"row"} alignItems="center" spacing={2} sx={{ width: "100%" }}>
                <LogoImage component="img" src={opponentIcon} sx={logoStyles} />
                <Typography
                  variant="h6"
                  component="h5"
                  sx={{ maxWidth: { tablet: "130px", laptop: "215px" }, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                >
                  {opponent}
                </Typography>
              </Stack>
            </StyledLogoStack>
          </Stack>
          <Stack
            direction={"column"}
            alignItems="flex-end"
            justifyContent="flex-end"
            gap={4}
            sx={{ minWidth: { tablet: "180px" }, maxWidth: "215px" }}
          >
            <Stack direction={"row"} alignItems="center" gap={4}>
              {index === 0 && (
                <Typography
                  variant="h6"
                  component="span"
                  sx={{ color: theme.palette.warning.main, fontSize: "14px !important", display: "flex", alignItems: "center", gap: ".25rem" }}
                >
                  <Box sx={{ height: "12px", width: "12px", backgroundColor: theme.palette.warning.main, borderRadius: "50%" }}></Box> Live
                </Typography>
              )}
              <Chip
                label={home === "TRUE" ? "Home" : "Away"}
                color="success"
                sx={{
                  fontSize: "12px",
                  backgroundColor: home === "TRUE" ? "#17c7722b" : `#283f7653`,
                  border: home === "TRUE" ? "1px solid #01984E" : `1px solid ${theme.palette.primary.main}`,
                  height: {
                    xs: "20px",
                    sm: "24px",
                    "& .MuiChip-label": { color: home === "TRUE" ? theme.palette.secondary.main : theme.palette.primary.main },
                  },
                }}
              />
            </Stack>
            <Link
              sx={{
                display: "flex",
                alignItems: "center",
                gap: ".25rem",
                fontSize: "14px",
                textDecoration: "underline",
                justifyContent: "flex-start",
                alignSelf: "flex-end",
              }}
            >
              <LocationOnIcon sx={{ fontSize: { xs: "1rem", md: "1.2rem" } }} />
              <Typography
                variant="small"
                component="small"
                sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: { tablet: "160px" } }}
              >
                {location}
              </Typography>
            </Link>
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
};

const ScheduleContentViewOnly = ({ ...props }) => {
  const { location, date } = props.data;
  const { isTablet } = useMediaQueries();
  const formattedDate = formatDateToLongString(date);
  const formattedDateMonth = formattedDate.split(" ")[0];
  const formattedDateDay = formattedDate.split(" ")[1];
  props = {
    ...props,
    formattedDateMonth,
    formattedDateDay,
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

  return (
    <div>
      {isTablet ? (
        <DesktopScheduleItem {...props} formattedDateMonth={formattedDateMonth} formattedDateDay={formattedDateDay} />
      ) : (
        <MobileScheduleItem {...props} formattedDateMonth={formattedDateMonth} formattedDateDay={formattedDateDay} />
      )}
    </div>
  );
};

export default ScheduleContentViewOnly;
