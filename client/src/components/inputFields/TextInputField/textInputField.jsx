import { InputLabel, TextField } from "@mui/material";
import React from "react";

const TextInputField = ({ ...props }) => {
  const { label, ...rest } = props;
  return (
    <>
      <InputLabel htmlFor={props.name}>{label}</InputLabel>
      <TextField type="text" {...rest} />
    </>
  );
};

export default TextInputField;
