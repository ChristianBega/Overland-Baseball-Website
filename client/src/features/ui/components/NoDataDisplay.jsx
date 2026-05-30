// MUI components
import { Box, Button, Typography } from "@mui/material";
import PropTypes from "prop-types";

// Components
import TextBlock from "./TextBlock";
/**
 * NoDataDisplay - Displays a friendly empty state when data is fetched but not available
 *
 * @component
 * @example
 * // Basic usage
 * <NoDataDisplay
 *   title="No Games Scheduled"
 *   message="Check back soon!"
 * />
 *
 * @example
 * // With action button
 * <NoDataDisplay
 *   title="No Events Available"
 *   message="Sign up to be notified when new events are posted"
 *   actionLabel="Sign Up For Updates"
 *   onActionClick={handleSignUp}
 * />
 */
const NoDataDisplay = ({
  title = "No Data Available",
  message = "Check back soon for updates!",
  icon,
  actionLabel,
  onActionClick,
  actionHref,
  sx = {},
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: { xs: 8, md: 16 },
        px: 2,
        ...sx,
      }}
    >
      <TextBlock
        direction="column"
        spacing={3}
        sx={{
          textAlign: "center",
          maxWidth: "500px",
        }}
      >
        {/* Icon */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {icon || (
            <Box
              component="svg"
              sx={{
                width: 64,
                height: 64,
                color: "grey.300",
              }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </Box>
          )}
        </Box>

        {/* Title */}
        <Typography
          variant="h5"
          component="h3"
          sx={{
            fontWeight: 600,
          }}
        >
          {title}
        </Typography>

        {/* Message */}
        <Typography
          variant="body1"
          sx={{
            opacity: 0.8,
          }}
        >
          {message}
        </Typography>

        {/* Optional Action Button */}
        {actionLabel && (
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={onActionClick}
            href={actionHref}
            sx={{
              mt: 2,
              px: 4,
              py: 1.5,
              borderRadius: 1,
              textTransform: "none",
              fontWeight: 600,
              fontSize: "1rem",
            }}
          >
            {actionLabel}
          </Button>
        )}
      </TextBlock>
    </Box>
  );
};

NoDataDisplay.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  icon: PropTypes.node,
  actionLabel: PropTypes.string,
  onActionClick: PropTypes.func,
  actionHref: PropTypes.string,
  sx: PropTypes.object,
};

export default NoDataDisplay;
