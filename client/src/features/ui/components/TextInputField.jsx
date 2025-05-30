import { InputLabel } from "@mui/material";
import React from "react";
import { commonInputStyles, commonLabelStyles, mergeStyles } from "./shared.styles";

const TextInputField = ({ cssProps, ...props }) => {
  const inputStyles = mergeStyles(commonInputStyles, {}, cssProps?.input);

  const labelStyles = mergeStyles(commonLabelStyles, {}, cssProps?.label);

  return (
    <>
      <InputLabel sx={labelStyles} htmlFor={props.name}>
        {props.label}
      </InputLabel>
      <input style={inputStyles} type={props.type} id={props.name} {...props} />
    </>
  );
};

export default TextInputField;
