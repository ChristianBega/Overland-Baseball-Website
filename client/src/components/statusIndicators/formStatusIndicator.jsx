import React from "react";
import { Box, CircularProgress, Alert } from "@mui/material";

const FormStatusIndicator = ({ statusMessage, progress }) => {
  return (
    <>
      {statusMessage}
      {/* {status === "loading" && (
        <Box display="flex" justifyContent="center" my={2}>
          <CircularProgress />
          <p>{progress}%</p>
        </Box>
      )}
      {status === "success" && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Success!
        </Alert>
      )}
      {status === "error" && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed! Please try again.
        </Alert>

      )} */}
    </>
  );
};

export default FormStatusIndicator;
