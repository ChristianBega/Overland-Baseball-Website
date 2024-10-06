import { Box, Step, StepLabel, Stepper } from "@mui/material";
import React, { useState } from "react";

import { processCsvUpload } from "./helpers/processCsvUpload";
import scheduleExpectedDataStructure from "./data/schedule.config.json";
import { bulkAddToFirebase } from "../../../../setup/utils/firebase/addItem";
import FormStatusIndicator from "../../../statusIndicators/formStatusIndicator";

const BulkAddItemsForm = ({ ...props }) => {
  const { uid, cmsItemType, closeModal, role, setSelectedItems } = props;

  const steps = ["Upload CSV", "Confirm Data", "Upload Progress"];
  const [csvData, setCsvData] = useState([]);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [status, setStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);

  const expectedCvsDataStructure = {
    schedule: scheduleExpectedDataStructure,
    // roster : "",
  };
  const handleCsvUpload = (e) => {
    processCsvUpload(e, setCsvData, expectedCvsDataStructure);
    setCurrentStep(1);
  };

  const handleConfirmData = async () => {
    setCurrentStep(2);
    setStatusMessage("Loading...");
    try {
      const result = await bulkAddToFirebase(uid, role, cmsItemType, csvData, setProgress);
      if (result.success === true) {
        setStatusMessage(result.message);
        setTimeout(() => {
          closeModal();
        }, 2000);
        setSelectedItems([]);
      }
    } catch (error) {
      setStatusMessage("Error during bulk add. Check the console for more details.");
      console.error("Error during bulk delete:", error);
      alert("Error during bulk add. Check the console for more details.");
    }
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
          <FormStatusIndicator statusMessage={statusMessage} progress={progress} />
          <p>Progress: {progress}%</p>
          <progress value={progress} max="100"></progress>
        </div>
      )}
    </Box>
  );
};

export default BulkAddItemsForm;
