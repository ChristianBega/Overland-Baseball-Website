import React from "react";
import { Typography } from "@mui/material";
import { StyledTableHeader } from "../../ui/components/DataTable";
import useMediaQueries from "../../../utils/helpers/useMediaQueries.utils";

// Data structure that matches our TableItem components exactly
const tableHeaderConfig = {
  schedule: {
    mobile: ["Date/Time", "Home", "VS", "Away", "Edit"],
    desktop: ["Date/Time", "Home", "VS", "Away", "Details", "Edit"],
  },
  events: {
    mobile: ["Date/Time", "Event", "Edit"],
    desktop: ["Date/Time", "Location", "Event", "Edit"],
  },
  roster: {
    all: ["Player", "Position", "Bats/Throws", "Number", "Year", "Height", "Weight", "Edit"],
  },
};

const CmsTableHeader = ({ dataType }) => {
  const { isSm, isMd } = useMediaQueries();

  // Get the appropriate header configuration
  const config = tableHeaderConfig[dataType];
  if (!config) {
    console.warn(`No header configuration found for data type: ${dataType}`);
    return null;
  }

  // Determine which headers to show based on screen size
  let headers;
  if (dataType === "roster") {
    headers = config.all;
  } else {
    headers = isSm ? config.desktop : config.mobile;
  }

  return (
    <StyledTableHeader>
      {/* Checkbox column */}
      <th style={{ width: "40px", textAlign: "center" }}>
        <Typography variant="caption" sx={{ fontWeight: 600 }}>
          Select
        </Typography>
      </th>

      {/* Data columns */}
      {headers.map((header, index) => (
        <th key={index}>
          <Typography variant="caption" sx={{ fontWeight: 600 }}>
            {header}
          </Typography>
        </th>
      ))}
    </StyledTableHeader>
  );
};

export default CmsTableHeader;
