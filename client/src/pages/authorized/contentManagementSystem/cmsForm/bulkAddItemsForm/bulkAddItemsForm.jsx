import { Box, Step, StepLabel, Stepper } from "@mui/material";
import React from "react";

const BulkAddItemsForm = () => {
  const steps = ["Upload CSV", "Confirm Data", "Upload Progress"];

  return (
    <Box component="form">
      <Stepper>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {/* Add step content here */}
    </Box>
  );
};

export default BulkAddItemsForm;
