import { InputLabel } from "@mui/material";
import React from "react";
import { 
  commonInputStyles, 
  commonLabelStyles, 
  inputVariants,
  mergeStyles 
} from "../styles/shared.styles";

const DateTimeField = ({ cssProps, ...props }) => {
  const dateTimeStyles = mergeStyles(
    commonInputStyles,
    inputVariants.datetime,
    cssProps?.input
  );

  const labelStyles = mergeStyles(
    commonLabelStyles,
    {},
    cssProps?.label
  );

  return (
    <>
      <InputLabel 
        sx={labelStyles} 
        htmlFor={props.name}
      >
        {props.label}
      </InputLabel>
      <input 
        style={dateTimeStyles} 
        type="datetime-local" 
        id={props.name} 
        {...props} 
      />
    </>
  );
};

export default DateTimeField;
