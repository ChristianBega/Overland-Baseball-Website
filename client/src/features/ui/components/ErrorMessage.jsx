// MUI components
import { Alert, AlertTitle } from "@mui/material";
import PropTypes from "prop-types";

/**
 * ErrorMessage - The single, accessible way to show an error message
 *
 * Built on MUI `Alert` (severity "error", standard variant): dark red text on a light
 * red tint (#5f2120 on #fdeded, ~10:1 contrast). The icon and `role="alert"` carry the
 * meaning, so callers should not add an "Error:" prefix to the message.
 *
 * @component
 * @example
 * // Basic usage
 * <ErrorMessage message="Unable to send your message. Please try again." />
 *
 * @example
 * // With title and action
 * <ErrorMessage
 *   title="Sign in required"
 *   message="You must be logged in to use this form."
 *   action={<Button color="inherit" size="small" href="/authentication/sign-in">Sign in</Button>}
 * />
 */
const ErrorMessage = ({ title, message, action, sx = {} }) => {
  return (
    <Alert
      severity="error"
      variant="standard"
      role="alert"
      action={action}
      sx={{
        width: "100%",
        textAlign: "left",
        alignItems: "center",
        "& .MuiAlert-message": {
          fontSize: "1rem",
          lineHeight: 1.5,
        },
        ...sx,
      }}
    >
      {title && <AlertTitle sx={{ fontWeight: 600 }}>{title}</AlertTitle>}
      {message}
    </Alert>
  );
};

ErrorMessage.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  action: PropTypes.node,
  sx: PropTypes.object,
};

export default ErrorMessage;
