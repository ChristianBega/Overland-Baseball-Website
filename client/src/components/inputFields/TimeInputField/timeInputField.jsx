import { InputLabel } from "@mui/material";
import React from "react";
import { commonInputStyles, commonLabelStyles, inputVariants, mergeStyles } from "../styles/shared.styles";

const TimeInputField = ({ cssProps, ...props }) => {
  const inputStyles = mergeStyles(
    commonInputStyles,
    inputVariants.time,
    cssProps?.input
  );

  const labelStyles = mergeStyles(
    commonLabelStyles,
    {},
    cssProps?.label
  );

  return (
    <>
      <InputLabel sx={labelStyles} htmlFor={props.name}>
        {props.label}
      </InputLabel>
      <input 
        style={inputStyles}
        type="time"
        id={props.name}
        {...props}
      />
    </>
  );
};

export default TimeInputField;
