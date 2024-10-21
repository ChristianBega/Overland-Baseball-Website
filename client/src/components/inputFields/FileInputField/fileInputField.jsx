import React from "react";
import { InputLabel } from "@mui/material";
// const StyledTextField = styled(TextField)(({ inputTextColor }) => ({
//   width: "100%",
//   ...(inputTextColor && { "& .MuiInputBase-input": { color: inputTextColor } }),
// }));

const FileInputField = ({ ...props }) => {
  const { label, cssProps, onChange, value,...rest } = props;
  return (
    <>
      <InputLabel sx={{ ...cssProps, fontSize: "14px" }} htmlFor={props.name}>
        {label}
      </InputLabel>
      <input type="file" onChange={onChange} />
    </>
  );
};

export default FileInputField;
