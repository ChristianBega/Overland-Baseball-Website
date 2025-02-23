import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useTheme } from "@mui/material/styles";
import { StyledTableCell } from "../../../styles/index.styles";

export const StatusMessage = ({ status, message }) => {
  const theme = useTheme();
  const getStatusColor = () => {
    switch (status) {
      case "error":
        return theme.palette.error.main;
      case "loading":
        return theme.palette.info.main;
      case "success":
        return theme.palette.success.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "error":
        return <ErrorIcon />;
      case "success":
        return <CheckCircleIcon />;
      default:
        return null;
    }
  };

  return (
    <StyledTableCell colSpan="100%" sx={{ padding: "0 !important" }}>
      <Stack
        alignItems="center"
        justifyContent="center"
        direction="row"
        spacing={2}
        sx={{
          width: "100%",
          backgroundColor: getStatusColor(),
          padding: theme.spacing(4),
        }}
      >
        {getStatusIcon() && <Box sx={{ color: "#fff" }}>{getStatusIcon()}</Box>}
        {message && (
          <Typography color="#fff" variant="body1" sx={{ fontWeight: "bold" }}>
            {message}
          </Typography>
        )}
        {status === "loading" && <CircularProgress sx={{ color: "#fff" }} size={20} />}
      </Stack>
    </StyledTableCell>
  );
};

const CmsOperationStatus = ({ isLoading, isError, isSuccess }) => {
  if (isLoading) {
    return <StatusMessage status="loading" message="" />;
  }

  if (isError) {
    return <StatusMessage status="error" message="There was an error. Please try again." />;
  }

  if (isSuccess) {
    return <StatusMessage status="success" message="Operation successful!" />;
  }

  return null;
};

export default CmsOperationStatus;
