import Papa from "papaparse";
export const processCsvUpload = (event, setCsvData) => {
  event.preventDefault();
  const file = event.target.files[0];
  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: (results) => {
      const mappedData = results.data.map((row) => ({
        // below the fold - this data will be dynamic based on the type of item you are adding
        date: row.date,
        time: row.time,
        opponent: row.opponent,
        opponentIcon: row.opponentIcon,
        location: row.location,
        home: row.home === "true", // Converts CSV string to boolean
        away: row.away === "true", // Converts CSV string to boolean
      }));

      setCsvData(mappedData);
    },
    error: (error) => {
      console.error("Error reading CSV:", error);
    },
  });
};
