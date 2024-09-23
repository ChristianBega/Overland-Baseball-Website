import { TextField } from "@mui/material";
import React from "react";

const TimeInputField = ({ ...props }) => {
  return <TextField {...props} type="time" />;
};

export default TimeInputField;
