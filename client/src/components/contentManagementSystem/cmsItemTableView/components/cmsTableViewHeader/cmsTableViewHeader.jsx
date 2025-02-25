import React, { useContext } from "react";
import { StyledTableCell } from "../../../../../styles/index.styles";
import { Typography } from "@mui/material";
import { convertToTitleCase } from "../../../../../setup/utils/helpers/convertText";
import { useUrlQueryParams } from "../../../../../setup/utils/helpers/useUrlQueryParams";
import { CmsEditItemContext } from "../../../../../setup/context/cmsContext/cmsEdit.context";

const headerConfigMap = {
  schedule: ["delete", "date & time", "team logo", "", "opponent logo", "opponent & location", "edit"],
  roster: ["delete", "player image", "Pos | Hgt | Wgt | Hnd | Number |Name", "year", "edit"],
  events: ["delete", "start date & time", "location", "event title", "edit"],
};

const CmsTableViewHeader = () => {
  const type = useUrlQueryParams().get("type");
  const { isEditing } = useContext(CmsEditItemContext);
  const headers = headerConfigMap[type] || [];
  return (
    <>
      {headers.map((header, index) => {
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
