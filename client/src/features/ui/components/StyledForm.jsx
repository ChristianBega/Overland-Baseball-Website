import { Box, styled } from "@mui/material";

export const StyledForm = styled(Box)(({ theme }) => ({
  maxWidth: "800px",
  margin: "auto",
  padding: "24px",
  borderRadius: "20px",
  backgroundColor: "#f8f9fa",
  border: "1px solid #ededf1",

  // You can add theme-based variations
  [theme.breakpoints.down("md")]: {
    padding: "16px",
    borderRadius: "16px",
  },
}));
