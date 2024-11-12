import { Box, Button, Step, StepLabel, Stepper, Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useState } from "react";

import { processCsvUpload } from "./helpers/processCsvUpload";
import scheduleExpectedDataStructure from "./data/schedule.config.json";
import eventExpectedDataStructure from "./data/event.config.json";
import { bulkAddToFirebase } from "../../../../setup/utils/firebase/addItem";
import FormStatusIndicator from "../../../statusIndicators/formStatusIndicator";
import rosterExpectedDataStructure from "./data/roster.config.json";
import { StyledTableCell } from "../../../../styles/index.styles";
import InputFieldComponent from "../../../inputFields/inputFields";

const BulkAddItemsForm = ({ ...props }) => {
  const { uid, cmsItemType, closeModal, role, setSelectedItems } = props;

  const steps = ["Upload CSV", "Confirm Data", "Upload Progress"];
  const [csvData, setCsvData] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [statusMessage, setStatusMessage] = useState(null);

  const expectedCvsDataStructure = {
    schedule: scheduleExpectedDataStructure,
    events: eventExpectedDataStructure,
    roster: rosterExpectedDataStructure,
  };
  const handleCsvUpload = (e) => {
    processCsvUpload(e, setCsvData, expectedCvsDataStructure, cmsItemType);
    setCurrentStep(1);
  };

  const handleConfirmData = async () => {
    setCurrentStep(2);
    setStatusMessage("Loading...");
    try {
      const result = await bulkAddToFirebase(uid, role, cmsItemType, csvData);
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
        <Box sx={{ marginBlock: "2rem" }}>
          {/* <input type="file" accept=".csv" onChange={handleCsvUpload} /> */}
          <InputFieldComponent type="file" accept=".csv" onChange={handleCsvUpload} cmsUploadItem={true} />
        </Box>
      )}

      {currentStep === 1 && (
        <Box>
          <TableContainer sx={{ maxHeight: "400px", overflow: "auto", marginBlock: "2rem" }}>
            <Table>
              <TableHead>
                <TableRow>
                  {Object.keys(csvData[0] || {}).map((key) => (
                    <StyledTableCell isCmsItem={true} className="table-header-cell table-header-cell-narrow" key={key}>
                      <p>{key}</p>
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {csvData.map((row, index) => (
                  <TableRow key={index}>
                    {Object.values(row).map((value, i) => (
                      <StyledTableCell isCmsItem={true} className="table-cell" sx={{ maxWidth: "200px" }} key={i}>
                        {value}
                      </StyledTableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button variant="contained" color="primary" onClick={handleConfirmData}>
            Confirm Data
          </Button>
        </Box>
      )}

      {currentStep === 2 && (
        <div>
          <FormStatusIndicator statusMessage={statusMessage} />
        </div>
      )}
    </Box>
  );
};

export default BulkAddItemsForm;
