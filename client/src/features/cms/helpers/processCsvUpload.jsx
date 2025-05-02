import Papa from "papaparse";

export const processCsvUpload = (event, setCsvData, expectedCsvDataStructure, cmsItemType) => {
  event.preventDefault();

  const file = event.target.files[0];

  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: (results) => {
      const expectedHeaders = Object.keys(expectedCsvDataStructure[cmsItemType]);
      const csvHeaders = results.meta.fields;
      // Check if all expected headers are present in the CSV
      const missingHeaders = expectedHeaders.filter((header) => !csvHeaders.includes(header));
      if (missingHeaders.length > 0) {
        alert(`CSV is missing the following required headers: ${missingHeaders.join(", ")}`);
        return;
      }
      // Check for extra headers in the CSV
      const extraHeaders = csvHeaders.filter((header) => !expectedHeaders.includes(header));
      if (extraHeaders.length > 0) {
        alert(`CSV contains unexpected headers: ${extraHeaders.join(", ")}`);
        return;
      }
      // Map the data if all headers match
      const mappedData = results.data.map((row) => {
        const mappedRow = {};
        expectedHeaders.forEach((header) => {
          mappedRow[header] = row[header];
        });
        return mappedRow;
      });

      setCsvData(mappedData);
    },
    error: (error) => {
      console.error("Error reading CSV:", error);
    },
  });
};
