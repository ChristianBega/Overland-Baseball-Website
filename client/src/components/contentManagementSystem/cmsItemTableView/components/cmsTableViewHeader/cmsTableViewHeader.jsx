import React, { useEffect, useState } from "react";
import { StyledTableCell } from "../../../../../styles/index.styles";
import { Typography } from "@mui/material";
import { convertToTitleCase } from "../../../../../setup/utils/helpers/convertText";
import { scheduleHeadersConfig } from "../config/scheduleHeaders.config";
import { useUrlQueryParams } from "../../../../../setup/utils/helpers/useUrlQueryParams";

// const reorderHeaders
// const groupHeaders

// 1. how can i make this component dynamic, reusable, and flexible?
// 2. i need to be able to :
//    a. reorder the headers so they match the column order in the table and data below
//    b. group the headers so they can be displayed in a specific order to match the UI and data below
//    c. include additional headers that are used for the cmsEdit functionality like edit, delete, etc.

const headerConfigMap = {
  "schedule": scheduleHeadersConfig,
  "roster": "",
};

const CmsTableViewHeader = ({ tableHeaders, editableItemData }) => {
  const [currentTableHeaders, setCurrentTableHeaders] = useState([]);
  const type = useUrlQueryParams().get("type");

  useEffect(() => {
    if (!tableHeaders || !headerConfigMap[type]) return;
    const excludedKeys = ["id", "addedByUserUid", "createdAt"];
    const headerKeys = Object.keys(tableHeaders[0]).filter((key) => !excludedKeys.includes(key));
    const headerConfig = headerConfigMap[type];

    const columnOrder = headerConfig[type].columnOrder;
    const additionalEditHeaders = headerConfig[type].additionalEditUiHeaders;
    const additionalTableHeaders = headerConfig[type].additionalUiHeaders;
    const editHeaders = editableItemData === null ? [] : additionalEditHeaders;
    const dataHeadersSet = [...headerKeys, ...editHeaders, ...additionalTableHeaders].map((header) => {
      if (typeof header === "string") {
        return header;
      } else if (header.header) {
        return header.header;
      }
    });
    const orderedHeaders = columnOrder.filter((header) => dataHeadersSet.includes(header.header));
    const groupedHeaders = new Set();
    const combinedHeaders = [];
    orderedHeaders.forEach((itemA) => {
      if (groupedHeaders.has(itemA.header)) return;
      if (itemA.groupWith) {
        const itemBIndex = orderedHeaders.findIndex((itemB) => itemB.header === itemA.groupWith);
        if (itemBIndex !== -1) {
          const itemB = orderedHeaders[itemBIndex];
          const combinedHeader = {
            header: `${itemA.header} & ${itemB.header}`,
            layout: `${itemA.layout} + ${itemB.layout}`,
            className: `${itemA.className === itemB.className ? itemA.className : ""}`,
          };
          combinedHeaders.push(combinedHeader);
          groupedHeaders.add(itemA.header);
          groupedHeaders.add(itemB.header);
        }
      } else {
        combinedHeaders.push(itemA);
      }
      setCurrentTableHeaders(combinedHeaders);
      // if (itemA.group) {
      //   // if header.group then combine headers with each header from the same group
      //   const itemBIndex = orderedHeaders.findIndex((itemB) => itemB.group === itemA.group);
      //   console.log("itemBIndex", itemBIndex);
      // }
      return combinedHeaders;
    });
    console.log("combinedHeaders", combinedHeaders);

    // console.log("test", test);
    // setCurrentTableHeaders(test);
  }, [tableHeaders, editableItemData]);
  return (
    <>
      {currentTableHeaders?.map((headerItem, index) => (
        // ${headerItem.className}
        <StyledTableCell className={`table-header-cell ${headerItem?.className}`} key={index}>
          <Typography component="p">{convertToTitleCase(headerItem?.header) || null}</Typography>
        </StyledTableCell>
      ))}
    </>
  );
};

export default CmsTableViewHeader;
