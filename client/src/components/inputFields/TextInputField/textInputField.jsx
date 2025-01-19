import { styled, TextField } from "@mui/material";
import React from "react";

const StyledTextField = styled(TextField)(({ inputTextColor }) => ({
  width: "100%",
  ...(inputTextColor && { "& .MuiInputBase-input": { color: inputTextColor } }),
}));
const TextInputField = ({ ...props }) => {
  return (
    <>
      <StyledTextField type="text" {...props} />
    </>
  );
};

export default TextInputField;
