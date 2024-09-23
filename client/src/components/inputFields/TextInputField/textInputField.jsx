import { TextField } from "@mui/material";
import React from "react";

const TextInputField = ({ ...props }) => {
  return <TextField type="text" {...props} />;
};

export default TextInputField;
