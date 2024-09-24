import { InputLabel } from "@mui/material";
import React from "react";

const TimeInputField = ({ ...props }) => {
  return (
    <>
      <InputLabel htmlFor={props.name}>{props.label}</InputLabel>
      <input type="time" {...props} />
    </>
  );
};

export default TimeInputField;
