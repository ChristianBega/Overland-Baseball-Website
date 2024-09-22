import { Box, Button, TextField } from "@mui/material";
import React from "react";

const AddItemsForm = () => {
  return (
    <Box component="form">
      <TextField label="Name" fullWidth margin="normal" />
      {/* Add more fields based on the type */}
      <Button variant="contained" color="primary">
        Create
      </Button>
    </Box>
  );
};

export default AddItemsForm;
