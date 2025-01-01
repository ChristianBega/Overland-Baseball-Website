import React from "react";
// MUI
import { Card, Stack, Typography } from "@mui/material";
// Assets
import { LogoImage } from "../../../../../../../../../styles/index.styles";
import overland from "../../../../../../../../../assets/homePage/teamLogos/overland.webp";
// Icons
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
// Styles
import { StyledDateBox, StyledLogoStack, StyledInfoLink, StyledInfoTypography } from "./scheduleContentViewOnly.styles";
import { formatDateString } from "../../../../../../../../../setup/utils/helpers/formatDate";

const ScheduleContentViewOnly = ({ ...props }) => {
  const { theme, formattedDateMonth, formattedDateDay } = props;
  const { time, location, opponentIcon, home, date } = props.data;
  return (
    <Stack direction="column" sx={{ "&:not(:first-child)": { marginTop: "2rem" } }} gap={2}>
      <Typography variant="h6" component="h3">
        {formatDateString(date)}
      </Typography>
      <Card ref={props.ref} id={props.eventId} variant="schedule-view-only">
        <StyledDateBox theme={theme}>
          <Typography variant="h6" sx={{ color: "#fff" }}>
            {formattedDateMonth} <br />
            {formattedDateDay}
          </Typography>
        </StyledDateBox>
        <Stack sx={{ width: "100%", paddingInline: "1rem" }}>
          <StyledLogoStack direction="row" alignItems="center">
            <LogoImage component="img" src={overland} sx={{ width: "55px", height: "50px" }} />
            {home ? <p>@</p> : <p>VS</p>}
            <LogoImage component="img" src={opponentIcon} sx={{ width: "55px", height: "50px" }} />
          </StyledLogoStack>
          <Stack direction="row" alignItems="center">
            <StyledInfoLink>
              <StyledInfoTypography variant="ellipsis">
                <AccessTimeIcon sx={{ fontSize: "14px" }} />
                {time}
              </StyledInfoTypography>
            </StyledInfoLink>
            <StyledInfoLink>
              <StyledInfoTypography variant="ellipsis">
                <LocationOnIcon sx={{ fontSize: "14px" }} />
                {location}
              </StyledInfoTypography>
            </StyledInfoLink>
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
};

export default ScheduleContentViewOnly;
