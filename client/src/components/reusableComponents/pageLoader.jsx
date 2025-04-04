// src/components/loading/PageLoader.jsx
import { Box, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const PageLoader = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        // height: "100%",
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <CircularProgress
        size={60}
        thickness={4}
        sx={{
          color: theme.palette.secondary.main,
        }}
      />
    </Box>
  );
};
