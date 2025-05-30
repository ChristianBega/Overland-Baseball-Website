import { InputLabel } from "@mui/material";
import React from "react";
import { commonInputStyles, commonLabelStyles, inputVariants, mergeStyles } from "./shared.styles";

const TextAreaInputField = ({ cssProps, ...props }) => {
  const inputStyles = mergeStyles(
    commonInputStyles,
    inputVariants.textarea,
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
      <textarea 
        style={inputStyles}
        id={props.name}
        {...props}
      />
    </>
  );
};

export default TextAreaInputField;
