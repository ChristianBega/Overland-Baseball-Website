import React from "react";
import { Typography, Stack } from "@mui/material";
import { LogoImage } from "../../../utils/theme/index.styles";
import { StyledTableCell } from "../../ui/components/DataTable";
import { TeamLogoAvatar } from "./GameCard.styles";
import useMediaQueries from "../../../utils/helpers/useMediaQueries.utils";
import overland from "../../../assets/homePage/teamLogos/overland.webp";
import { StyledDataCell, StyledDataCellWithMinWidth } from "../../roster/components/TeamRosterTableView.styles";
import { TextTruncate } from "../../ui";

// Fixed section - Matchup only
const ScheduleTableItemFixed = ({ data, isCmsItem }) => {
  const { location, opponent, opponentIcon } = data || {};

  return (
    <>
      <StyledTableCell sx={{ height: "70px" }}>
        <Stack direction="row" alignItems="center" gap={1}>
          <LogoImage component="img" src={overland} alt="Overland logo" sx={{ width: "45px", height: "45px" }} />
          <Typography variant="caption" sx={{ fontSize: "12px" }}>
            {location !== "Overland High" ? "@" : "vs"}
          </Typography>
          {opponentIcon ? (
            <LogoImage component="img" src={opponentIcon} alt={`${opponent} logo`} sx={{ width: "45px", height: "45px" }} />
          ) : (
            <TeamLogoAvatar sx={{ width: "45px", height: "45px" }}>{opponent?.charAt(0)}</TeamLogoAvatar>
          )}
        </Stack>
      </StyledTableCell>
    </>
  );
};

// Scrollable section - Date/Time + Location + Details + Actions
const ScheduleTableItemScrollable = ({ data, isCmsItem }) => {
  const { date, time, location, opponent } = data || {};

  return (
    <>
      <StyledDataCellWithMinWidth minWidth="200px" sx={{ height: "70px" }}>
        <Stack direction="column" gap={0.5}>
          {date}
          {time}
        </Stack>
      </StyledDataCellWithMinWidth>
      <StyledDataCellWithMinWidth minWidth="300px" sx={{ height: "70px" }}>
        <TextTruncate text={location} maxChars={30} variant="span" component="p" />
      </StyledDataCellWithMinWidth>
      <StyledDataCellWithMinWidth minWidth="300px" sx={{ height: "70px" }}>
        <TextTruncate text={opponent} maxChars={30} variant="span" component="p" />
      </StyledDataCellWithMinWidth>
      {/* <StyledDataCell>
        <Stack direction="column" gap={0.5}>
          {date}

          {time}
        </Stack>
      </StyledDataCell>
      <StyledDataCell>
        <Typography sx={{ fontSize: "14px" }}>{location}</Typography>
      </StyledDataCell>
      <StyledDataCell>vs {opponent}</StyledDataCell> */}
    </>
  );
};

// Main component that handles section rendering
const ScheduleTableItem = ({ data, isCmsItem, section }) => {
  if (section === "fixed") {
    return <ScheduleTableItemFixed data={data} isCmsItem={isCmsItem} />;
  } else if (section === "scrollable") {
    return <ScheduleTableItemScrollable data={data} isCmsItem={isCmsItem} />;
  }

  // Fallback to original behavior if no section specified
  return (
    <>
      <ScheduleTableItemFixed data={data} isCmsItem={isCmsItem} />
      <ScheduleTableItemScrollable data={data} isCmsItem={isCmsItem} />
    </>
  );
};

export default ScheduleTableItem;
