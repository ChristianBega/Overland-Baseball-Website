import React from "react";
import { Box, CircularProgress, Alert } from "@mui/material";

const FormStatusIndicator = ({ status, progress }) => {
  return (
    <>
      {status === "loading" && (
        <Box display="flex" justifyContent="center" my={2}>
          <CircularProgress />
          <p>{progress}%</p>
        </Box>
      )}
      {status === "success" && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Item added successfully!
        </Alert>
      )}
      {status === "error" && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to add item. Please try again.
        </Alert>
      )}
    </>
  );
};

export default FormStatusIndicator;
