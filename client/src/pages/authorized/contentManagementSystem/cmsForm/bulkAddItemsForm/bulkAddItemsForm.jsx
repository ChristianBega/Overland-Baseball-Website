import { Box, Step, StepLabel, Stepper } from "@mui/material";
import React, { useState } from "react";

import { bulkAddToFirebase } from "../../../../../setup/utils/firebase/addItem";
import { processCsvUpload } from "./helpers/processCsvUpload";
import scheduleExpectedDataStructure from "./data/schedule.config.json";

const BulkAddItemsForm = ({ ...props }) => {
  const { uid, cmsItemType, closeModal, role } = props;

  const steps = ["Upload CSV", "Confirm Data", "Upload Progress"];
  const [csvData, setCsvData] = useState([]);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const expectedCvsDataStructure = {
    schedule: scheduleExpectedDataStructure,
    // roster : "",
  };
  const handleCsvUpload = (e) => {
    processCsvUpload(e, setCsvData, expectedCvsDataStructure);
    setCurrentStep(1);
  };

  const handleConfirmData = () => {
    setCurrentStep(2);
    bulkAddToFirebase(uid, role, cmsItemType, csvData, setProgress);
  };

  return (
    <Box component="form">
      <Stepper activeStep={currentStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {currentStep === 0 && (
        <>
          <input type="file" accept=".csv" onChange={handleCsvUpload} />
        </>
      )}

      {currentStep === 1 && (
        <div>
          <table>
            <thead>
              <tr>
                {Object.keys(csvData[0] || {}).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {csvData.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, i) => (
                    <td key={i}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleConfirmData}>Confirm Data</button>
        </div>
      )}

      {currentStep === 2 && (
        <div>
          <p>Progress: {progress}%</p>
          <progress value={progress} max="100"></progress>
        </div>
      )}
    </Box>
  );
};

export default BulkAddItemsForm;
