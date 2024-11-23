import { InputLabel, styled, TextField } from "@mui/material";
import React from "react";

const StyledTextField = styled(TextField)(({ inputTextColor }) => ({
  width: "100%",
  ...(inputTextColor && { "& .MuiInputBase-input": { color: inputTextColor } }),
}));
const TextInputField = ({ ...props }) => {
  const { label, cssProps, ...rest } = props;
  return (
    <>
      <InputLabel sx={{ ...cssProps, fontSize: "14px" }} htmlFor={props.name}>
        {label}
      </InputLabel>
      <StyledTextField type="text" {...rest} />
    </>
  );
};

export default TextInputField;