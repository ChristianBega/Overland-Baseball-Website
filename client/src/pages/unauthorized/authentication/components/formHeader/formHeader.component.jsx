import { Box, Typography } from "@mui/material";
import React from "react";

const FormHeader = ({ formHeaderContent }) => {
  return (
    <Box>
      <Typography component="h1" variant="h1">
        {formHeaderContent}
      </Typography>
    </Box>
  );
};

export default FormHeader;
