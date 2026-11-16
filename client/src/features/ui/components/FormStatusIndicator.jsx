/** Form status line: spinner while loading, success message, or an inline error `Notice`. Use under every form. */
import React from "react";
import PropTypes from "prop-types";
// Mui
import { Box, CircularProgress, Typography, Stack } from "@mui/material";
// Icons
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { StyledFormStatusIndicatorContainer } from "./FormStatusIndicator.styles";
import Notice from "./Notice";

const FormStatusIndicator = ({ statusMessage, statusCode, loading, error, success }) => {
  // const isAuthFormError = error && statusMessage === "You must be logged in to use this form.";
  const showSuccess = !error && ((statusCode && statusMessage) || (success && statusMessage));
  return (
    <>
      {error && <Notice variant="error" layout="inline" title={statusMessage || "Something went wrong"} sx={{ mb: "2rem" }} />}
      {(loading || (!error && (statusMessage || success))) && (
        <StyledFormStatusIndicatorContainer>
          {showSuccess && (
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
        </StyledFormStatusIndicatorContainer>
      )}
    </>
  );
};

FormStatusIndicator.propTypes = {
  // Text shown for success and error states.
  statusMessage: PropTypes.string,
  // HTTP status of the response; with `statusMessage` it shows the success line.
  statusCode: PropTypes.number,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  success: PropTypes.bool,
};

export default FormStatusIndicator;
