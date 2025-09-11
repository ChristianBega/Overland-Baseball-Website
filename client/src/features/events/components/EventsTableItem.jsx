import React from "react";
import { Typography, Stack } from "@mui/material";
import { StyledTableCell } from "../../ui/components/DataTable";

// Fixed section - Event name only
const EventsTableItemFixed = ({ data, isCmsItem }) => {
  const { title } = data || {};

  return (
    <>
      <StyledTableCell style={{ minWidth: "150px" }}>
        <Typography component="span" sx={{ fontSize: "14px", fontWeight: 500 }}>
          {title}
        </Typography>
      </StyledTableCell>
    </>
  );
};

// Scrollable section - Date/Time + Location + Edit
const EventsTableItemScrollable = ({ data, isCmsItem }) => {
  const { startDateTime, location } = data || {};

  return (
    <>
      <StyledTableCell style={{ minWidth: "120px" }}>
        <Stack direction="column" justifyContent="center" gap={1}>
          <Typography component="p" variant="body2" sx={{ fontWeight: 500 }}>
            {startDateTime}
          </Typography>
        </Stack>
      </StyledTableCell>
      <StyledTableCell style={{ minWidth: "150px" }}>
        <Typography sx={{ fontSize: "14px" }}>{location}</Typography>
      </StyledTableCell>
    </>
  );
};

// Main component that handles section rendering
const EventsTableItem = ({ data, isCmsItem, section }) => {
  if (section === "fixed") {
    return <EventsTableItemFixed data={data} isCmsItem={isCmsItem} />;
  } else if (section === "scrollable") {
    return <EventsTableItemScrollable data={data} isCmsItem={isCmsItem} />;
  }

  // Fallback to original behavior if no section specified
  return (
    <>
      <EventsTableItemFixed data={data} isCmsItem={isCmsItem} />
      <EventsTableItemScrollable data={data} isCmsItem={isCmsItem} />
    </>
  );
};

export default EventsTableItem;
