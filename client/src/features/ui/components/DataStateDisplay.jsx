// MUI components
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import PropTypes from "prop-types";

// Components
import TextBlock from "./TextBlock";
import NoDataDisplay from "./NoDataDisplay";

/**
 * DataStateDisplay - Handles all data fetching states (loading, error, empty, success)
 *
 * @component
 * @example
 * // Basic usage with React Query
 * const { data: games, isLoading, isError, error, refetch } = useQuery(...);
 *
 * <DataStateDisplay
 *   isLoading={isLoading}
 *   isError={isError}
 *   error={error}
 *   isEmpty={!games || games.length === 0}
 *   onRetry={refetch}
 *   emptyProps={{
 *     title: "No Games Scheduled",
 *     message: "Check back soon!",
 *     actionLabel: "Sign Up",
 *     actionHref: "/signup"
 *   }}
 * >
 *   {games.map(game => <GameCard key={game.id} game={game} />)}
 * </DataStateDisplay>
 */
const DataStateDisplay = ({
  isLoading = false,
  isError = false,
  error = null,
  isEmpty = false,
  onRetry,
  emptyProps = {},
  loadingMessage = "Loading...",
  errorTitle = "Something Went Wrong",
  children,
  sx = {},
}) => {
  // Loading State
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          py: 8,
          ...sx,
        }}
      >
        <TextBlock direction="column" spacing={2} sx={{ alignItems: "center" }}>
          <CircularProgress color="secondary" size={48} />
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              fontWeight: 500,
            }}
          >
            {loadingMessage}
          </Typography>
        </TextBlock>
      </Box>
    );
  }

  // Error State
  if (isError) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          py: 8,
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
          {/* Error Icon */}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box
              component="svg"
              sx={{
                width: 64,
                height: 64,
                color: "error.main",
              }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </Box>
          </Box>

          {/* Error Title */}
          <Typography
            variant="h5"
            component="h3"
            sx={{
              fontWeight: 600,
              color: "text.primary",
            }}
          >
            {errorTitle}
          </Typography>

          {/* Error Message */}
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              opacity: 0.8,
            }}
          >
            {error?.message || "Unable to load data. Please try again."}
          </Typography>

          {/* Retry Button */}
          {onRetry && (
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={onRetry}
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
              Try Again
            </Button>
          )}
        </TextBlock>
      </Box>
    );
  }

  // Empty State
  if (isEmpty) {
    return <NoDataDisplay {...emptyProps} sx={sx} />;
  }

  // Success State - Render Children
  return children;
};

DataStateDisplay.propTypes = {
  // State flags
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  error: PropTypes.object,
  isEmpty: PropTypes.bool,

  // Actions
  onRetry: PropTypes.func,

  // Customization
  emptyProps: PropTypes.shape({
    title: PropTypes.string,
    message: PropTypes.string,
    icon: PropTypes.node,
    actionLabel: PropTypes.string,
    onActionClick: PropTypes.func,
    actionHref: PropTypes.string,
  }),
  loadingMessage: PropTypes.string,
  errorTitle: PropTypes.string,

  // Content
  children: PropTypes.node,

  // Styling
  sx: PropTypes.object,
};

export default DataStateDisplay;
