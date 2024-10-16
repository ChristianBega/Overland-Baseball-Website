export const generateTableHeaders = (displayData, columnOrder, additionalHeaders = []) => {
  if (!columnOrder || !additionalHeaders) {
    return [];
  }
  if (!displayData || displayData.length === 0) {
    return additionalHeaders;
  }

  const dataHeaders = Object.keys(displayData[0]);
  const additionalHeadersArray = additionalHeaders.map((header) => header.header);
  const dataHeadersSet = [...dataHeaders, ...additionalHeadersArray];

  const orderedHeaders = columnOrder.filter((header) => dataHeadersSet.includes(header.header));

  const combinedHeaders = [];

  const groupedHeaders = new Set();

  orderedHeaders.forEach((itemA, indexA) => {
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
  });
  return combinedHeaders;
};

export const tableHeadersMap = {
  schedule: {
    columnOrder: [
      { header: "delete", layout: "single", className: "table-header-cell-narrow" },
      { header: "date", layout: "grouped", groupWith: "time", className: "table-header-cell-normal" },
      { header: "time", layout: "grouped", groupWith: "date", className: "table-header-cell-normal" },
      { header: "teamIcon", layout: "single", className: "table-header-cell-wide" },
      { header: null, layout: "single", className: "table-header-cell-wide" },
      { header: "opponentIcon", layout: "single", className: "table-header-cell-wide" },
      { header: "opponent", layout: "grouped", groupWith: "location", className: "table-header-cell-wide" },
      { header: "location", layout: "grouped", groupWith: "opponent", className: "table-header-cell-wide" },
      { header: "edit", layout: "single" },
    ],
    additionalEditUiHeaders: [
      { header: "delete", layout: "single" },
      { header: "edit", layout: "single" },
      { header: "teamIcon", layout: "single" },
      { header: null, layout: "single", className: "table-header-cell-wide" },
    ],
    additionalUiHeaders: [
      { header: "teamIcon", layout: "single" },
      { header: "edit", layout: "single" },
      { header: null, layout: "single", className: "table-header-cell-wide" },
    ],
  },
  roster: {
    columnOrder: [
      { header: "delete", layout: "single", className: "table-header-cell-narrow" },
      { header: "position", layout: "grouped", groupWith: "height", group: "a", className: "table-header-cell-normal" },
      { header: "height", layout: "grouped", groupWith: "position", group: "a" },
      { header: "weight", layout: "grouped", groupWith: "handed", group: "a" },
      { header: "handed", layout: "grouped", groupWith: "weight", group: "a" },
      { header: "number", layout: "grouped", groupWith: "name", group: "a" },
      { header: "name", layout: "grouped", groupWith: "number", group: "a" },
      { header: "year", layout: "grouped", groupWith: "yearAbbr" },
      { header: "yearAbbr", layout: "grouped", groupWith: "year" },
      { header: "edit", layout: "single" },
    ],
    additionalEditUiHeaders: [
      { header: "delete", layout: "single" },
      { header: "edit", layout: "single" },
    ],
    additionalUiHeaders: [{ header: "teamIcon", layout: "single" }],
  },
};

// Crate a tableHeader component
// that takes in the table headers from the tableHeadersMap
// and returns a table header component
// this way we don't need to include the edit, delete, etc in the tablesHeaderMap and instead create it as a component
// this way we don't
