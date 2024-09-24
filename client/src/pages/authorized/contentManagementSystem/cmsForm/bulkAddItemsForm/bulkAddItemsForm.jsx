// import { Box, Step, StepLabel, Stepper } from "@mui/material";
// import React, { useState } from "react";

// import { bulkAddToFirebase } from "../../../../../setup/utils/firebase/addItem";
// import { processCsvUpload } from "./helpers/processCsvUpload";

// const BulkAddItemsForm = () => {
//   const steps = ["Upload CSV", "Confirm Data", "Upload Progress"];
//   const [csvData, setCsvData] = useState([]);
//   const [progress, setProgress] = useState(0);

//   const handleBulkAddClick = (e) => {
//     e.preventDefault();
//     bulkAddToFirebase(csvData, setProgress);
//   };

//   return (
//     <Box component="form">
//       <Stepper>
//         {steps.map((label) => (
//           <Step key={label}>
//             <StepLabel>{label}</StepLabel>
//           </Step>
//         ))}
//       </Stepper>
//       <input type="file" accept=".csv" onChange={(e) => processCsvUpload(e, setCsvData)} />
//       <button onClick={handleBulkAddClick} disabled={csvData.length === 0}>
//         Bulk Add to Firebase
//       </button>

//       <div>
//         <p>Progress: {progress}%</p>
//         <progress value={progress} max="100"></progress>
//       </div>
//       {/* Add step content here */}
//     </Box>
//   );
// };

// export default BulkAddItemsForm;

import { Box, Step, StepLabel, Stepper } from "@mui/material";
import React, { useState } from "react";

import { bulkAddToFirebase } from "../../../../../setup/utils/firebase/addItem";
import { processCsvUpload } from "./helpers/processCsvUpload";

const BulkAddItemsForm = ({ ...props }) => {
  const { uid, cmsItemType, closeModal, role } = props;
  // userUid
  // cmsItemType
  const steps = ["Upload CSV", "Confirm Data", "Upload Progress"];
  const [csvData, setCsvData] = useState([]);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const handleCsvUpload = (e) => {
    processCsvUpload(e, setCsvData);
    setCurrentStep(1);
  };

  const handleConfirmData = () => {
    setCurrentStep(2);
    // console.log("Line 1 - userUid:", uid);
    // console.log("Line 2 - role:", role);
    // console.log("Line 3 - cmsItemType:", cmsItemType);
    // console.log("Line 4 - csvData:", csvData);
    // console.log("Line 5 - setProgress:", setProgress);
    bulkAddToFirebase(uid, role, cmsItemType, csvData, setProgress);
  };

  // const handleBulkAddClick = (e) => {
  //   e.preventDefault();
  //   setCurrentStep(2);
  // };

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
          {/* <button onClick={handleBulkAddClick} disabled={csvData.length === 0}>
            Bulk Add to Firebase
          </button> */}
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
