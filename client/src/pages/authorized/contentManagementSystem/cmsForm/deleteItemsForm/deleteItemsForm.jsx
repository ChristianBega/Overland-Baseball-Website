import { Box, Button } from "@mui/material";
import React from "react";

const DeleteItemsForm = () => {
  return (
    <Box component="form">
      <p>Are you sure you want to delete the selected items?</p>
      <Button variant="contained" color="secondary">
        Confirm Delete
      </Button>
    </Box>
  );
};

export default DeleteItemsForm;
