import React from "react";
import { Box, Button, styled } from "@mui/material";

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.secondary.main,
}));
export default function HomePage() {
  // const theme = useTheme();
  return <div>Home Page</div>;
}
