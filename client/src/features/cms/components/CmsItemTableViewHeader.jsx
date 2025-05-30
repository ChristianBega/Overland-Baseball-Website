import React, { useContext } from "react";
import { StyledTableCell } from "../../../utils/theme/index.styles";
import { Typography } from "@mui/material";
import { convertToTitleCase } from "../../../utils/helpers/convertText";
import { useUrlQueryParams } from "../../../utils/helpers/useUrlQueryParams";
import { CmsEditItemContext } from "../../../features/cms/context/CmsEdit.context";
import useMediaQueries from "../../../utils/helpers/useMediaQueries.utils";

const isLgHeaderConfigMap = {
  schedule: ["delete", "date & time", "team logo", "", "opponent logo", "opponent & location", "edit"],
  roster: ["", "edit"],
  events: ["delete", "start date & time", "location", "event title", "edit"],
};
const isSmHeaderConfigMap = {
  schedule: ["delete", "team logo", "", "opponent logo", "edit"],
  roster: ["", "edit"],
  events: ["delete", "start date & time", "event title", "edit"],
};

const isMdHeaderConfigMap = {
  schedule: ["delete", "date & time", "team logo", "", "opponent logo", "edit"],
  roster: ["", "edit"],
  events: ["delete", "start date & time", "event title", "edit"],
};

const CmsTableViewHeader = () => {
  const { isSmDown, isMdDown } = useMediaQueries();
  const type = useUrlQueryParams().get("type");
  const { isEditing } = useContext(CmsEditItemContext);
  const isLgHeaders = isLgHeaderConfigMap[type] || [];
  const isSmHeaders = isSmHeaderConfigMap[type] || [];
  const isMdHeaders = isMdHeaderConfigMap[type] || [];
  const currentHeaders = isSmDown ? isSmHeaders : isMdDown ? isMdHeaders : isLgHeaders;
  return (
    <>
      {currentHeaders.map((header, index) => {
        if (header === "delete" && !isEditing) {
          return null;
        }

        if (header === "delete" && isEditing) {
          return (
            <StyledTableCell key={index} className={`table-cell-dark ${isEditing ? "table-cell-cms-list-item" : ""}`} isCmsItem>
              <Typography component="p">Delete</Typography>
            </StyledTableCell>
          );
        }

        if (header === "") {
          return <StyledTableCell key={index} className={`table-cell-dark ${isEditing ? "table-cell-cms-list-item" : ""}`} isCmsItem />;
        }

        if (header === "edit") {
          return (
            <StyledTableCell key={index} className={`table-cell-dark ${isEditing ? "table-cell-cms-list-item" : ""}`} isCmsItem>
              <Typography component="p">{isEditing ? "Save/Cancel" : "Edit"}</Typography>
            </StyledTableCell>
          );
        }

        return (
          <StyledTableCell key={index} className={`table-cell-dark ${header}-header`} isCmsItem>
            <Typography component="p">{convertToTitleCase(header)}</Typography>
          </StyledTableCell>
        );
      })}
    </>
  );
};

export default CmsTableViewHeader;
