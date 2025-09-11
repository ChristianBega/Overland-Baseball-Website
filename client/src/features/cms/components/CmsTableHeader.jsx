import React from "react";
import { Typography } from "@mui/material";

// import { StyledTableCell } from "../../../utils/theme/index.styles";
import useMediaQueries from "../../../utils/helpers/useMediaQueries.utils";
import { StyledTableCell } from "../../ui/components/DataTable";
import { StyledDataHeaderCell, StyledNameHeaderCell } from "../../roster/components/TeamRosterTableView.styles";

// Split table configuration with minimum widths for responsive behavior
const tableHeaderConfig = {
  schedule: {
    fixed: [{ label: "Matchup", minWidth: "200px" }], // Date + teams need space for logos
    scrollable: [{ label: "Date/Time" }, { label: "Location" }, { label: "Details" }, { label: "Edit" }], // Secondary data + actions
  },
  events: {
    fixed: [{ label: "Event" }], // Key identifying data
    scrollable: [{ label: "Date/Time" }, { label: "Location" }, { label: "Edit" }], // Secondary data + actions
  },
  roster: {
    fixed: [{ label: "Player" }], // Name + image
    scrollable: [
      { label: "Position" },
      { label: "Bats/Throws" },
      { label: "Number" },
      { label: "Year" },
      { label: "Height" },
      { label: "Weight" },
      { label: "Edit" },
    ], // All other data
  },
};

const CmsTableHeader = ({ dataType, section }) => {
  const { isSm, isMd, isLg } = useMediaQueries();

  // Get the appropriate header configuration
  const config = tableHeaderConfig[dataType];
  if (!config) {
    console.warn(`No header configuration found for data type: ${dataType}`);
    return null;
  }

  // Get headers for the specified section (fixed or scrollable)
  const headers = config[section] || [];

  return (
    <>
      {/* if fixed -->  styledNameHeaderCell */}
      {/* if scrollable -->  styledDataHeaderCell */}
      {section === "fixed"
        ? headers.map((header, index) => <StyledNameHeaderCell key={index}>{header.label}</StyledNameHeaderCell>)
        : // if "edit" width needs to be 50px
          headers.map((header, index) => (
            <StyledDataHeaderCell isEditCell={header.label === "Edit"} key={index}>
              {header.label}
            </StyledDataHeaderCell>
          ))}
    </>
  );
};

export default CmsTableHeader;
