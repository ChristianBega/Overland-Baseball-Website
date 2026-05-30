import React from "react";
// Mui
import { Box, CircularProgress, Typography, Stack } from "@mui/material";
// Icons
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { StyledFormStatusIndicatorContainer } from "./FormStatusIndicator.styles";

const FormStatusIndicator = ({ statusMessage, statusCode, loading, error, success }) => {
  // const isAuthFormError = error && statusMessage === "You must be logged in to use this form.";
  return (
    <>
      {(statusMessage || success || loading || error || success) && (
        <StyledFormStatusIndicatorContainer>
          {((statusCode && statusMessage) || (success && statusMessage)) && (
            <Stack direction="row" spacing={1}>
              <CheckCircleIcon />
              <Typography variant="body1" color="success">
                {statusMessage}
              </Typography>
            </Stack>
          )}
          {loading && (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <CircularProgress />
            </Box>
          )}
          {error && (
            <Stack direction="row" spacing={1}>
              <ErrorIcon />
              <Typography variant="body1" color="error">
                Error: {statusMessage}
              </Typography>
            </Stack>
          )}
        </StyledFormStatusIndicatorContainer>
      )}
    </>
  );
};

export default FormStatusIndicator;
