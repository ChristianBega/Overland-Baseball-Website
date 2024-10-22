import React from "react";
import { InputLabel } from "@mui/material";
// const StyledTextField = styled(TextField)(({ inputTextColor }) => ({
//   width: "100%",
//   ...(inputTextColor && { "& .MuiInputBase-input": { color: inputTextColor } }),
// }));

const FileInputField = ({ ...props }) => {
  const { label, cssProps, value, onChange, ...rest } = props;
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    onChange(file); //! Pass the File object to the parent
  };
  return (
    <>
      <InputLabel sx={{ ...cssProps, fontSize: "14px" }} htmlFor={props.name}>
        {label}
      </InputLabel>
      <input type="file" {...rest} onChange={handleFileChange} />
    </>
  );
};

export default FileInputField;
