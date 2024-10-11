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
      { header: "delete", layout: "single" },
      { header: "position", layout: "single" },
      { header: "height", layout: "single" },
      { header: "weight", layout: "single" },
      { header: "handed", layout: "single" },
      { header: "number", layout: "single" },
      { header: "name", layout: "single" },
      { header: "year", layout: "single" },
      { header: "yearAbbr", layout: "single" },
      { header: "edit", layout: "single" },
    ],
    additionalEditUiHeaders: [
      { header: "delete", layout: "single" },
      { header: "edit", layout: "single" },
    ],
    additionalUiHeaders: [{ header: "teamIcon", layout: "single" }],
  },
};
