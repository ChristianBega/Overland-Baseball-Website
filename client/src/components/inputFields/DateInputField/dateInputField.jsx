import { TextField } from "@mui/material";
import React from "react";

const DateInputField = ({ ...props }) => {
  // id={name} type={type} error={Boolean(errors[name])} variant="outlined" helperText={errors[name]?.message} variable {...field}
  return <TextField {...props} type="date" />;
};

export default DateInputField;
