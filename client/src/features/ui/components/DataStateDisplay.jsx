// MUI components
import { Box, CircularProgress, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import PropTypes from "prop-types";

// Components
import TextBlock from "./TextBlock";
import NoDataDisplay from "./NoDataDisplay";
import Notice from "./Notice";

/**
 * DataStateDisplay - Handles all data fetching states (loading, error, empty, success)
 *
 * @component
 * @example
 * // Basic usage with useStrapiCollection (see features/home/components/Schedule.jsx)
 * const { data: games, loading, error, refetch } = useStrapiCollection("schedules");
 *
 * <DataStateDisplay
 *   isLoading={loading}
 *   isError={!!error}
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
  errorIcon,
  errorMessage = "Check your connection, then try again.",
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
    const details = typeof error === "string" ? error : error?.message;
    return (
      <Notice
        variant="error"
        layout="stacked"
        icon={errorIcon}
        title={errorTitle}
        message={errorMessage}
        action={onRetry ? { label: "Try again", onClick: onRetry, startIcon: <RefreshIcon /> } : undefined}
        details={details || undefined}
        sx={sx}
      />
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
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
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
  // Error badge icon; defaults to ErrorOutline.
  errorIcon: PropTypes.node,
  // One friendly line under the error title. The raw error goes behind "Technical details".
  errorMessage: PropTypes.string,

  // Content
  children: PropTypes.node,

  // Styling
  sx: PropTypes.object,
};

export default DataStateDisplay;
