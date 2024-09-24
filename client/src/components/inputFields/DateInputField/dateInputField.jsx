import { InputLabel } from "@mui/material";
import React from "react";

const DateInputField = ({ ...props }) => {
  return (
    <>
      <InputLabel htmlFor={props.name}>{props.label}</InputLabel>
      <input type="date" id={props.name} {...props} />
    </>
  );
};

export default DateInputField;
