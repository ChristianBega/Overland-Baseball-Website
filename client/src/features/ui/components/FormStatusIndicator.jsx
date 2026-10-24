import React from "react";
// Mui
import { Box, CircularProgress, Typography, Stack } from "@mui/material";
// Icons
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { StyledFormStatusIndicatorContainer } from "./FormStatusIndicator.styles";
// Components
import ErrorMessage from "./ErrorMessage";

const FormStatusIndicator = ({ statusMessage, statusCode, loading, error, success }) => {
  // const isAuthFormError = error && statusMessage === "You must be logged in to use this form.";
  const isErrorOnly = error && !loading;
  return (
    <>
      {(statusMessage || success || loading || error || success) && (
        <StyledFormStatusIndicatorContainer isErrorOnly={isErrorOnly}>
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
          {error && <ErrorMessage message={statusMessage} />}
        </StyledFormStatusIndicatorContainer>
      )}
    </>
  );
};

export default FormStatusIndicator;
